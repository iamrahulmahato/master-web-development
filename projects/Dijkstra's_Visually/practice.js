function init() {
    var curr_data;
    var sz, src, dst;
    var container = document.getElementById('mynetwork');
    var container2 = document.getElementById("mynetwork2");
    var genNew = document.getElementById('generate-graph');
    var solve = document.getElementById('solve');
    var temptext = document.getElementById('temptext');
    var temptext2 = document.getElementById('temptext2');
    var temptext1 = document.getElementById('temptext1');
    var temptext3 = document.getElementById('temptext3');
    var options = {
        edges: {
            labelHighlightBold: true,
            font: {
                size: 20
            }
        },
        nodes: {
            font: '12px arial red',
            scaling: {
                label: true
            },
            shape: 'icon',
            icon: {
                face: 'FontAwesome',
                code: '\uf015',
                size: 40,
                color: '#991133',
            }
        }
    };

    var network = new vis.Network(container);
    network.setOptions(options);
    var network2 = new vis.Network(container2);
    network2.setOptions(options);

    function createData() {
        const cities = [
            "Mumbai", "Bangalore", "Chennai", "Hyderabad", "Kolkata",
            "Thiruvananthapuram", "Jaipur", "Bhopal", "Guwahati", "Chandigarh",
            "Delhi", "Ahmedabad", "Pune", "Lucknow", "Patna", "Bhubaneswar",
            "Shillong", "Dehradun", "Gangtok", "Shimla", "Ranchi",
            "Panaji", "Imphal", "Itanagar", "Aizawl", "Kohima", "Agartala"
        ];

        sz = Math.floor(Math.random() * 8) + 3;
        let nodes = [];
        for (let i = 1; i <= sz; i++) {
            nodes.push({ id: i, label: cities[i - 1] });
        }
        nodes = new vis.DataSet(nodes);

        let edges = [];
        for (let i = 2; i <= sz; i++) {
            let neigh = i - Math.floor(Math.random() * Math.min(i - 1, 3) + 1);
            edges.push({ type: 0, from: i, to: neigh, color: 'orange', label: String(Math.floor(Math.random() * 70) + 31) });
        }

        src = 1;
        dst = sz;
        let extraEdges = Math.floor(sz / 2);
        while (extraEdges > 0) {
            let n1 = Math.floor(Math.random() * sz) + 1;
            let n2 = Math.floor(Math.random() * sz) + 1;
            if (n1 !== n2) {
                if (n1 > n2) [n1, n2] = [n2, n1];
                let exists = edges.some(edge => edge.from === n1 && edge.to === n2);
                if (!exists) {
                    if (extraEdges > sz / 4) {
                        edges.push({ type: 0, from: n1, to: n2, color: 'orange', label: String(Math.floor(Math.random() * 70) + 31) });
                    } else {
                        edges.push({ type: 1, from: n1, to: n2, color: 'green', label: String(Math.floor(Math.random() * 50) + 1) });
                    }
                    extraEdges--;
                }
            }
        }

        curr_data = { nodes: nodes, edges: edges };
    }

    genNew.onclick = function() {
        createData();
        network.setData(curr_data);
        temptext.innerText = "Find least time path from " + curr_data.nodes.get(src).label + ' to ' + curr_data.nodes.get(dst).label;
        temptext1.innerText = "Red link represents bus travel time.";
        temptext1.classList.remove('d-none'); // Ensure temptext is visible
        temptext2.innerText = "Green link represents plane travel time.";
        temptext2.classList.remove('d-none'); // Ensure temptext2 is visible
        temptext3.innerText = "Click on solve to the Solution!!";
        temptext3.classList.remove('d-none'); // Ensure temptext2 is visible
        container2.style.display = "none";
    };
    

    solve.onclick = function() {
        temptext2.style.display = "none";
        temptext3.style.display="none";
        container2.style.display = "inline-block";
        temptext1.style.display="none";
        let data = solveData(sz, curr_data, src, dst); // Pass src and dst as parameters
        network2.setData(data);
    };
}

function djikstra(graph, V, src) {
    let vis = Array(V).fill(false);
    let dist = Array.from({ length: V }, () => [Infinity, -1]);

    // Initialize source node distance to itself as 0
    dist[src] = [0, -1];

    for (let i = 0; i < V - 1; i++) {
        let mn = -1;
        for (let j = 0; j < V; j++) {
            if (!vis[j] && (mn === -1 || dist[j][0] < dist[mn][0])) {
                mn = j;
            }
        }
        vis[mn] = true;
        for (let j = 0; j < graph[mn].length; j++) {
            let edge = graph[mn][j];
            if (!vis[edge[0]] && dist[edge[0]][0] > dist[mn][0] + edge[1]) {
                dist[edge[0]][0] = dist[mn][0] + edge[1];
                dist[edge[0]][1] = mn;
            }
        }
    }
    return dist;
}


function solveData(sz, data, src, dst) {
    let nodes = data.nodes.get();
    let edges = data.edges;

    // Initialize adjacency list for the graph
    let graph = Array(sz + 1).fill().map(() => []);

    // Build the adjacency list representation of the graph
    edges.forEach(edge => {
        graph[edge.from].push([edge.to, parseInt(edge.label)]);
        graph[edge.to].push([edge.from, parseInt(edge.label)]); // Uncomment for undirected graph
    });

    // Run Dijkstra's algorithm to find the shortest path
    let distances = djikstra(graph, sz + 1, src);

    // Reconstruct the shortest path from src to dst
    let path = [];
    for (let at = dst; at !== -1; at = distances[at][1]) {
        path.push(at);
    }
    path.reverse();

    // Push edges with arrows for the shortest path
    let shortestPathEdges = pushEdges(distances, dst, true);

    // Highlight the shortest path edges
    let highlightedEdges = edges.map(edge => {
        if (path.includes(edge.from) && path.includes(edge.to)) {
            return { ...edge, color: 'blue' };
        }
        return edge;
    });

    // Combine original edges with highlighted shortest path edges
    let updatedEdges = highlightedEdges.concat(shortestPathEdges);

    // Return the updated data with highlighted shortest path and arrows
    return { nodes: data.nodes, edges: updatedEdges };
}

function pushEdges(dist, curr, reverse) {
    let tmp_edges = [];
    while (dist[curr][0] !== 0) {
        let fm = dist[curr][1];
        if (reverse) {
            tmp_edges.push({ arrows: { to: { enabled: true } }, from: curr + 1, to: fm + 1, color: 'orange', label: String(dist[curr][0]) });
        } else {
            tmp_edges.push({ arrows: { to: { enabled: true } }, from: fm + 1, to: curr + 1, color: 'orange', label: String(dist[curr][0]) });
        }
        curr = fm;
    }
    return tmp_edges;
}

init();
