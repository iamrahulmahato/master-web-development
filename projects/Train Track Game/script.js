(C = {
    unit: "px",
    camX: 0,
    camY: 0,
    camZ: 0,
    camRX: 0,
    camRY: 0,
    camRZ: 0,
    sc: 0,
    sprites: [],
    pc: 0,
    cc: 0,
    o: {},
    $: (l) => self[l],
    init: (l) => {
        l.css || (l.css = ""),
            l.html || (l.html = ""),
            l.g || (l.g = "scene"),
            l.o || (l.o = "center"),
            "top left" == l.o && ((l.x += l.w / 2), (l.y += l.h / 2)),
            "top" == l.o && (l.y += l.h / 2),
            "top right" == l.o && ((l.x -= l.w / 2), (l.y += l.h / 2)),
            "right" == l.o && (l.x -= l.w / 2),
            "bottom right" == l.o && ((l.x -= l.w / 2), (l.y -= l.h / 2)),
            "bottom" == l.o && (l.y -= l.h / 2),
            "bottom left" == l.o && ((l.x += l.w / 2), (l.y -= l.h / 2)),
            "left" == l.o && (l.x += l.w / 2),
            l.w || (l.w = 0),
            l.h || (l.h = 0),
            l.x || (l.x = 0),
            l.y || (l.y = 0),
            l.z || (l.z = 0),
            l.sk || (l.sk = 0),
            l.rx || (l.rx = 0),
            l.ry || (l.ry = 0),
            l.rz || (l.rz = 0),
            l.sx || (l.sx = 1),
            l.sy || (l.sy = 1),
            l.sz || (l.sz = 1),
            (C.o[l.n] = l);
    },
    group: (l) => {
        l.d || 0 === l.d || (l.d = l.h),
            C.init(l),
            (C.$(l.g).innerHTML += `<div id="${l.n}"class="group ${l.css
                }"style="position:absolute;width:${l.w}${C.unit};height:${l.d}${C.unit
                };transform:${C.tr(l)}">`);
    },
    plane: (l) => {
        l.n || (l.n = "plane" + C.pc++),
            C.init(l),
            (C.$(l.g).innerHTML += `<div id="${l.n}"class="plane ${l.css
                }"style="position:absolute;width:${l.w}${C.unit};height:${l.h}${C.unit
                };background:${l.b};transform-origin:${l.o};transform:${C.tr(l)}">${l.html
                }`);
    },
    sprite: (l) => {
        l.n || (l.n = "sprite" + C.sc++),
            C.init(l),
            (C.$(l.g).innerHTML += `<div id="${l.n}"class="sprite ${l.css
                }"style="position:absolute;width:${l.w}${C.unit};height:${l.h}${C.unit
                };background:${l.b};transform-origin:${l.o};transform:${C.tr(l)}">${l.html
                }`),
            C.sprites.push(l.n);
    },
    cube: (l, t, n, e, a, u, o) => {
        l.n || (l.n = "cube" + C.cc++),
            C.init(l),
            C.group(l),
            n &&
            C.plane({
                g: l.n,
                x: l.w / 2,
                y: l.d / 2,
                w: l.w,
                h: l.d,
                b: l.b,
                css: "bottom",
            }),
            e &&
            C.plane({
                g: l.n,
                y: l.d / 2,
                w: l.d,
                h: l.h,
                b: l.b1 || l.b,
                rx: -90,
                ry: -90,
                o: "bottom",
                css: "left",
            }),
            a &&
            C.plane({
                g: l.n,
                x: l.w,
                y: l.d / 2,
                w: l.d,
                h: l.h,
                b: l.b2 || l.b,
                rx: -90,
                ry: -90,
                o: "bottom",
                css: "right",
            }),
            o &&
            C.plane({
                g: l.n,
                x: l.w / 2,
                y: 0,
                w: l.w,
                h: l.h,
                b: l.b1 || l.b,
                rx: -90,
                o: "bottom",
                css: "back",
            }),
            u &&
            C.plane({
                g: l.n,
                x: l.w / 2,
                y: l.d,
                w: l.w,
                h: l.h,
                b: l.b2 || l.b,
                rx: -90,
                o: "bottom",
                css: "front",
            }),
            t &&
            C.plane({
                g: l.n,
                x: l.w / 2,
                y: l.d / 2,
                z: l.h,
                w: l.w,
                h: l.d,
                b: l.up || l.b,
                css: "top",
            });
    },
    camera: (l) => {
        for (var t in (l && (l.x || 0 === l.x) && (C.camX = l.x),
            l && (l.y || 0 === l.y) && (C.camY = l.y),
            l && (l.z || 0 === l.z) && (C.camZ = l.z),
            l && (l.rx || 0 === l.rx) && (C.camRX = l.rx),
            l && (l.ry || 0 === l.ry) && (C.camRY = l.ry),
            l && (l.rz || 0 === l.rz) && (C.camRZ = l.rz),
            (C.camX += (Math.random() - 0.5) / 1e3),
            (scene.style.transform = `translateX(${-C.camX}${C.unit
                })translateY(${-C.camY}${C.unit})translateZ(${-C.camZ}${C.unit})rotateX(${C.camRX
                }deg)rotateY(${C.camRY}deg)rotateZ(${C.camRZ}deg)`),
            C.sprites)) {
            var n = C.$(C.sprites[t]),
                e = n.style.transform.replace(/ *rotate.*\(.*?deg\)/g, "");
            n.style.transform =
                e + `rotateZ(${-C.camRZ}deg)rotateX(${-C.camRX}deg)`;
        }
    },
    move: (l) => {
        if (l.n) {
            var t = C.$(l.n),
                n = C.o[l.n];
            (l.x || 0 === l.x) && (n.x = l.x),
                (l.y || 0 === l.y) && (n.y = l.y),
                (l.z || 0 === l.z) && (n.z = l.z),
                (l.rx || 0 === l.rx) && (n.rx = l.rx),
                (l.ry || 0 === l.ry) && (n.ry = l.ry),
                (l.rz || 0 === l.rz) && (n.rz = l.rz),
                (l.sx || 0 === l.sx) && (n.sx = l.sx),
                (l.sy || 0 === l.sy) && (n.sy = l.sy),
                (l.sz || 0 === l.sz) && (n.sz = l.sz),
                (C.o[l.n] = n),
                (t.style.transform = C.tr(n));
        }
    },
    tr: (l) =>
        `translateX(-50%)translateY(-50%)translateX(${l.x}${C.unit})translateY(${l.y}${C.unit})translateZ(${l.z}${C.unit})rotateX(${l.rx}deg)rotateY(${l.ry}deg)rotateZ(${l.rz}deg)scaleX(${l.sx})scaleY(${l.sy})scaleZ(${l.sz})skew(${l.sk})`,
}),
    (draw_train = (l, t, n) => {
        C.group({ n: "train", x: l, y: t, z: n }),
            C.plane({
                g: "train",
                w: 50,
                h: 50,
                y: -10,
                z: 2,
                html: "<img src=1f682.svg>",
                css: "train",
                rx: -90,
                ry: 180,
                o: "bottom",
            }),
            C.plane({
                g: "train",
                w: 50,
                h: 50,
                y: 10,
                z: 2,
                html: "<img src=1f682.svg>",
                css: "train",
                rx: -90,
                ry: 180,
                o: "bottom",
            }),
            C.cube(
                {
                    g: "train",
                    x: -15,
                    z: 10,
                    w: 16,
                    h: 34.5,
                    d: 19,
                    b: "#A11",
                    up: "#911",
                },
                1,
                0,
                1,
                1,
                0,
                0
            ),
            C.cube(
                { g: "train", x: 6, z: 15, w: 26, h: 18, d: 19, b: "#444" },
                1,
                0,
                1,
                1,
                0,
                0
            ),
            C.cube(
                { g: "train", x: 12, z: 33, w: 8, h: 10, d: 19, b: "#666" },
                0,
                0,
                1,
                1,
                0,
                0
            ),
            C.cube(
                { g: "train", x: 12, z: 42, w: 10, h: 5, d: 19, b: "#444" },
                1,
                0,
                1,
                1,
                0,
                0
            ),
            C.plane({ g: "train", b: "#c46c0a", w: 2.5, h: 19, z: 34 }),
            C.plane({ g: "train", b: "#c46c0a", w: 2.5, h: 19, z: 34, x: 7.5 }),
            C.plane({
                g: "train",
                b: "#151515",
                w: 15,
                h: 19,
                z: 24,
                x: 20.5,
                ry: 90,
            }),
            C.plane({ g: "train", b: "#c33", w: 15, h: 19, z: 10, x: 21, ry: 45 });
    }),
    (draw_boat = (l, t, n) => {
        if (!mobile) {
            var e = (3.1 * Math.random()) | 0;
            C.sprite({
                n: "boat",
                w: 50,
                h: 50,
                x: l,
                y: t - 5,
                html: ["⛵", "⛴", "🚢", "🐳"][e],
                z: [-235, -245, -240, -227][e],
                css: "boat",
                rx: -90,
                ry: 180,
                o: "bottom",
            });
        }
    }),
    (draw_track = (l, t, n, e, a = 1, u = "") => {
        C.group({
            n: "group" + gc,
            w: 100,
            h: 22,
            sx: a,
            sy: a,
            sz: a,
            x: l,
            y: t,
            z: n,
            css: "track",
        }),
            C.cube(
                {
                    g: "group" + gc,
                    w: 110,
                    h: 6,
                    d: 8,
                    x: 50,
                    y: 11,
                    b: "#888",
                    css: "iron",
                },
                1,
                0,
                0,
                0,
                1,
                mobile ? 0 : 1
            ),
            C.cube(
                {
                    g: "group" + gc,
                    w: 110,
                    h: 6,
                    d: 8,
                    x: 50,
                    y: -11,
                    b: "#888",
                    css: "iron",
                },
                1,
                0,
                0,
                0,
                mobile ? 0 : 1,
                1
            ),
            C.plane({
                g: "group" + gc,
                w: 107,
                h: 16,
                x: 50,
                z: 6,
                css: "woods",
                html: _ ? u : "",
            }),
            e &&
            C.cube(
                {
                    g: "group" + gc,
                    w: 5,
                    h: (n - -244) / a + (7 != S && (mobile || S < 4) ? 0 : 300),
                    d: 5,
                    x: 50,
                    z:
                        -0.2 - (n - -244) / a - (7 != S && (mobile || S < 4) ? 0 : 300),
                    b: "#333",
                    b2: "#555",
                    b3: "#333",
                },
                0,
                0,
                1,
                1,
                1,
                0
            ),
            gc++;
    }),
    (draw_track_lite = (l, t, n, e, a = 1, u = "") => {
        C.group({
            n: "group" + gc,
            w: 500,
            h: 22,
            sx: a,
            sy: a,
            sz: a,
            x: l,
            y: t,
            z: n,
            css: "track",
        }),
            C.cube(
                {
                    g: "group" + gc,
                    w: 500,
                    h: 6,
                    d: 8,
                    x: 50,
                    y: 11,
                    b: "#888",
                    css: "iron",
                },
                1,
                0,
                0,
                0,
                1,
                mobile ? 0 : 1
            ),
            C.cube(
                {
                    g: "group" + gc,
                    w: 500,
                    h: 6,
                    d: 8,
                    x: 50,
                    y: -11,
                    b: "#888",
                    css: "iron",
                },
                1,
                0,
                0,
                0,
                mobile ? 0 : 1,
                1
            ),
            C.plane({
                g: "group" + gc,
                w: 500,
                h: 16,
                x: 50,
                z: 6,
                css: "woods",
                html: _ ? u : "",
            }),
            gc++;
    }),
    (draw_tracks = () => {
        draw_track_lite(-400, 0, 0);
        for (var l = 0; l < track.length; l++)
            draw_track(
                track[l][0],
                track[l][1],
                track[l][2],
                track[l][3],
                track[l][4],
                l + ""
            );
        track[7]
            ? draw_track_lite(
                track[7][0] + 500 * (track[7][4] || 1),
                track[7][1],
                track[7][2],
                0,
                track[7][4] || 1
            )
            : draw_track_lite(
                track[track.length - 1][0] + 500,
                track[track.length - 1][1],
                track[track.length - 1][2]
            );
    }),
    (draw_dynamite = (l, t, n, e) => {
        C.sprite({
            w: 30,
            h: 30,
            x: l,
            y: t - 11,
            z: n + 30,
            html: "<img src=1f9e8.svg>",
            css: "dynamite",
            n: "d_" + e,
        });
    }),
    (draw_hills = () => {
        var l, t, n;
        for (
            mobile ||
            C.sprite({ w: 500, h: 500, x: -1e3, y: -2e3, z: 1e3, css: "sun" }),
            C.plane({ n: "river", w: 668, h: 1200, x: 0, z: -247, css: "river" }),
            mobile ||
            C.plane({
                n: "river2",
                w: 668,
                h: 1200,
                x: 0,
                z: -246,
                css: "river2",
            }),
            C.plane({ w: 600, h: 1200, x: -700, z: -0.7, css: "hill" }),
            C.plane({ w: 600, h: 1200, x: 700, z: -0.7, css: "hill" }),
            C.plane({
                w: 600,
                h: 1200,
                x: -400,
                z: -0.5,
                ry: 75,
                o: "left",
                css: "hill2",
                n: "h2left",
            }),
            C.plane({
                w: 600,
                h: 1200,
                x: 400,
                z: -0.5,
                ry: -75,
                o: "right",
                css: "hill2",
                n: "h2right",
            }),
            C.plane({
                w: 600,
                h: 600,
                x: -620,
                y: 0,
                z: -300.8,
                rx: -90,
                sk: "15deg",
                css: "hill3",
                n: "h3left",
            }),
            C.plane({
                w: 600,
                h: 600,
                x: 620,
                y: 0,
                z: -300.8,
                rx: -90,
                sk: "-15deg",
                css: "hill3",
                n: "h3right",
            }),
            t = 0,
            n = 0,
            X2 = 0,
            Y2 = 0,
            X3 = 0,
            Y3 = 0;
            (Math.abs(X2 - t) < 120 && Math.abs(Y2 - n) < 100) ||
            (Math.abs(X3 - t) < 100 && Math.abs(Y3 - n) < 100) ||
            (Math.abs(X3 - X2) < 100 && Math.abs(Y3 - Y2) < 100);

        )
            (t = -470 - 300 * Math.random()),
                (X2 = -470 - 300 * Math.random()),
                (X3 = -470 - 300 * Math.random()),
                (n = -120 - 300 * Math.random()),
                (Y2 = -120 - 300 * Math.random()),
                (Y3 = -120 - 300 * Math.random());
        for (
            C.sprite({
                w: 60,
                h: 60,
                x: t,
                y: n,
                z: 0,
                html: (l = ["🌳", "🌴", "🌲", "🐄"][(3.1 * Math.random()) | 0]),
                css: "tree fixed",
                o: "bottom",
            }),
            mobile ||
            C.plane({
                w: 60,
                h: 60,
                x: t,
                y: n,
                z: 0,
                html: l,
                css: "tree fixed shadow",
                o: "bottom",
                rz: 100,
            }),
            C.sprite({
                w: 60,
                h: 60,
                x: X2,
                y: Y2,
                z: 0,
                html: (l = ["🌳", "🌴", "🌲", "🐄"][(3.1 * Math.random()) | 0]),
                css: "tree fixed",
                o: "bottom",
            }),
            mobile ||
            C.plane({
                w: 60,
                h: 60,
                x: X2,
                y: Y2,
                z: 0,
                html: l,
                css: "tree fixed shadow",
                o: "bottom",
                rz: 100,
            }),
            C.sprite({
                w: 60,
                h: 60,
                x: X3,
                y: Y3,
                z: 0,
                html: (l = ["🌳", "🌴", "🌲", "🐄"][(3.1 * Math.random()) | 0]),
                css: "tree fixed",
                o: "bottom",
            }),
            mobile ||
            C.plane({
                w: 60,
                h: 60,
                x: X3,
                y: Y3,
                z: 0,
                html: l,
                css: "tree fixed shadow",
                o: "bottom",
                rz: 100,
            }),
            t = 0,
            n = 0,
            X2 = 0,
            Y2 = 0,
            X3 = 0,
            Y3 = 0;
            (Math.abs(X2 - t) < 120 && Math.abs(Y2 - n) < 100) ||
            (Math.abs(X3 - t) < 100 && Math.abs(Y3 - n) < 100) ||
            (Math.abs(X3 - X2) < 100 && Math.abs(Y3 - Y2) < 100);

        )
            (t = 470 + 300 * Math.random()),
                (X2 = 470 + 300 * Math.random()),
                (X3 = 470 + 300 * Math.random()),
                (n = -120 - 300 * Math.random()),
                (Y2 = -120 - 300 * Math.random()),
                (Y3 = -120 - 300 * Math.random());
        C.sprite({
            w: 60,
            h: 60,
            x: t,
            y: n,
            z: 0,
            html: (l = ["🌳", "🌴", "🌲", "🦙"][(3.1 * Math.random()) | 0]),
            css: "tree fixed",
            o: "bottom",
        }),
            mobile ||
            C.plane({
                w: 60,
                h: 60,
                x: t,
                y: n,
                z: 0,
                html: l,
                css: "tree fixed shadow",
                o: "bottom",
                rz: 100,
            }),
            C.sprite({
                w: 60,
                h: 60,
                x: X2,
                y: Y2,
                z: 0,
                html: (l = ["🌳", "🌴", "🌲", "🦙"][(3.1 * Math.random()) | 0]),
                css: "tree fixed",
                o: "bottom",
            }),
            mobile ||
            C.plane({
                w: 60,
                h: 60,
                x: X2,
                y: Y2,
                z: 0,
                html: l,
                css: "tree fixed shadow",
                o: "bottom",
                rz: 100,
            }),
            C.sprite({
                w: 60,
                h: 60,
                x: X3,
                y: Y3,
                z: 0,
                html: (l = ["🌳", "🌴", "🌲", "🦙"][(3.1 * Math.random()) | 0]),
                css: "tree fixed",
                o: "bottom",
            }),
            mobile ||
            C.plane({
                w: 60,
                h: 60,
                x: X3,
                y: Y3,
                z: 0,
                html: l,
                css: "tree fixed shadow",
                o: "bottom",
                rz: 100,
            }),
            (t = 470 + 300 * Math.random()),
            (n = 120 + 300 * Math.random()),
            C.sprite({
                w: 60,
                h: 60,
                x: t,
                y: n,
                z: 0,
                html: (l = ["🌳", "🌴", "🌲", "🐐"][(3.1 * Math.random()) | 0]),
                css: "tree fixed",
                o: "bottom",
            }),
            mobile ||
            C.plane({
                w: 60,
                h: 60,
                x: t,
                y: n,
                z: 0,
                html: l,
                css: "tree fixed shadow",
                o: "bottom",
                rz: 100,
            }),
            (t = -470 - 300 * Math.random()),
            (n = 120 + 300 * Math.random()),
            C.sprite({
                w: 60,
                h: 60,
                x: t,
                y: n,
                z: 0,
                html: (l = ["🌳", "🌴", "🌲", "🐐"][(3.1 * Math.random()) | 0]),
                css: "tree fixed",
                o: "bottom",
            }),
            mobile ||
            C.plane({
                w: 60,
                h: 60,
                x: t,
                y: n,
                z: 0,
                html: l,
                css: "tree fixed shadow",
                o: "bottom",
                rz: 100,
            });
    }),
    (levels = () => {
        if (
            (1 == S
                ? (draw_boat(-100, -450, -235),
                    (track = [
                        [-300, 0, 0, 1],
                        [-200, 0, 0, 1],
                        [-100, 0, 0, 1],
                        [0, 0, 0, 1],
                        [100, 0, 0, 1],
                        [200, 0, 0, 1],
                        [300, 0, 0, 1],
                        [400, 0, 0, 0],
                    ]),
                    (links = {
                        default: [
                            [, 1],
                            [0, 2],
                            [1, 3],
                            [2, 4],
                            [3, 5],
                            [4, 6],
                            [5, 7],
                            [6],
                        ],
                    }))
                : 2 == S
                    ? (draw_boat(200, 60, -235),
                        1 == 1 ||
                            1 == 1 ||
                            1 == 1
                            ? (track = [
                                [-300, 0, 0, 1],
                                [-200, 0, 0, 1],
                                [-100, 100, 0, 1],
                                [0, 0, 0, 1],
                                [100, 0, 0, 1],
                                [202, -200, 0, 1],
                                [300, 0, 0, 1],
                                [400, 0, 0, 0],
                            ])
                            : (track = []),
                        (links = {
                            "2d": {
                                front: [
                                    [, 1],
                                    [0, 2],
                                    [1, 3],
                                    [2, 4],
                                    [3, 5],
                                    [4, 6],
                                    [5, 7],
                                    [6],
                                ],
                            },
                            default: [[, 1], [0], [,], [, 4], [3], [,], [, 7], [6]],
                        }))
                    : 3 == S
                        ? (draw_boat(200, 100),
                            (track = [
                                [-300, 0, 0, 1],
                                [-284, -165, -165, 1, 1.4],
                                [-100, 0, 0, 1],
                                [0, -400, 0, 1],
                                [100, 0, 0, 1],
                                [120, 155, 155, 1, 0.6],
                                [300, 0, 0, 1],
                                [400, 0, 0],
                            ]),
                            (links = {
                                "2d": { front: [[,], [,], [, 3], [2, 4], [3], [,], [, 7], [6]] },
                                "3d": {
                                    midup: [
                                        [, 1],
                                        [0, 2, -200, 0, 0, 1],
                                        [1],
                                        [,],
                                        [, 5, 60, 155, 155, 0.6],
                                        [4, 6, 120, 155, 155, 0.6],
                                        [5, 7, 180, 155, 155, 0.6],
                                        [6, , 240, 155, 155, 0.6],
                                    ],
                                },
                            }))
                        : 4 == S
                            ? (draw_boat(-200, -400, -235),
                                (track = [
                                    [-300, 0, 0, 1],
                                    [-200, 0, 0, 1],
                                    [-73, 13, 150, 1, 0.73],
                                    [0, 0, 0, 1],
                                    [100, 0, 0, 1],
                                    [200, -200, 0, 1],
                                    [300, 0, 0, 1],
                                    [400, 0, 0, 0],
                                ]),
                                (links = {
                                    default: [[, 1], [0], [,], [, 4], [3], [,], [, 7], [6]],
                                    "3d": {
                                        up: [
                                            [, 1, -219, 13, 150, 0.72],
                                            [0, 2, -146, 13, 150, 0.72],
                                            [1, 3],
                                            [2, 4, 0, 13, 150, 0.72],
                                            [3, , 73, 13, 150, 0.72],
                                            [,],
                                            [, 7],
                                            [6],
                                        ],
                                    },
                                    "2d": {
                                        middle: [
                                            [, 1],
                                            [0],
                                            [, 3],
                                            [2, 4],
                                            [3, 5],
                                            [4, 6, 200, 0, 0],
                                            [5, 7],
                                            [6],
                                        ],
                                    },
                                }))
                            : 5 == S &&
                            (draw_boat(250, -400, -235),
                                (track = [
                                    [-298, 0, 0, 1.05],
                                    [-202, -300, 0, 1.05],
                                    [-100, -300, 0, 0],
                                    [0, -300, 0, 0],
                                    [100, -300, 0, 1],
                                    [133, -70, -130, 1, 0.65],
                                    [117, -151, 157, 0, 1.12],
                                    [506, -54, 0, 0, 1.47],
                                    [217, 118, 151, 1, 0.9],
                                ]),
                                (links = {
                                    default: [[,], [, 2], [1, 3], [2, 4], [3], [,], [,], [,], [,]],
                                    "2d": {
                                        middle: [
                                            [, 1],
                                            [0, 2],
                                            [1, 3],
                                            [2, 4],
                                            [3],
                                            [,],
                                            [, 8],
                                            [,],
                                            [6],
                                        ],
                                        midup: [
                                            [,],
                                            [, 2],
                                            [1, 3],
                                            [2, 4],
                                            [3],
                                            [,],
                                            [,],
                                            [9, , 397, 118, 151, 0.9],
                                            [,],
                                        ],
                                    },
                                    "3d": {
                                        middown: [
                                            [,],
                                            [, 2],
                                            [1, 3],
                                            [2, 4],
                                            [3, 5],
                                            [4, , 200, -300, 0, 1],
                                            [, 8],
                                            [,],
                                            [,],
                                        ],
                                        down: [
                                            [,],
                                            [, 2],
                                            [1, 3],
                                            [2, 4],
                                            [3],
                                            [6, , 227, -151, 157, 1.12],
                                            [, 5],
                                            [,],
                                            [,],
                                        ],
                                        midup: [
                                            [,],
                                            [, 2],
                                            [1, 3],
                                            [2, 4],
                                            [3],
                                            [,],
                                            [,],
                                            [8, , 307, 118, 151, 0.9],
                                            [, 7],
                                        ],
                                    },
                                })),
                6 == S)
        )
            draw_boat(-100, -450, -235),
                (track = [
                    [-300, 0, 0, 1],
                    [-273, 140, 198, 1, 0.68],
                    [-100, 0, 0, 1],
                    [173, 172, -22, 1, 1.45],
                    [100, 0, 0, 1],
                    [22, 186, 264, 1],
                    [300, 0, 0, 1],
                    [400, 0, 0, 0],
                ]),
                (links = {
                    default: [[,], [,], [,], [,], [,], [,], [, 7], [6]],
                    "3d": {
                        leftfrontmidup: [
                            [, 1, -341, 140, 198, 0.68],
                            [0, 2],
                            [1, , -205, 140, 198, 0.68],
                            [,],
                            [,],
                            [,],
                            [, 7],
                            [6],
                        ],
                        leftbackmiddle: [
                            [,],
                            [,],
                            [, 3],
                            [2, 4, 0, 0, 0, 1],
                            [3],
                            [,],
                            [, 7],
                            [6],
                        ],
                    },
                    "2d": {
                        rightbackmiddown: [
                            [,],
                            [,],
                            [,],
                            [,],
                            [, 5, -78, 186, 264],
                            [4, 6],
                            [5, 7, 122, 186, 264],
                            [6, , 222, 186, 264],
                        ],
                    },
                });
        else if (7 == S)
            draw_boat(200, 60, -235),
                (cp = "leftfront"),
                draw_track(0, 0, 0, 1),
                setTimeout(() => {
                    C.camera({ rz: (camrz = -45) }), camera();
                }, 200),
                (track = [
                    [-300, 0, 0, 1],
                    [0, 375, 532, 1, 1.9],
                    [-100, 0, 0, 1],
                    [100, 0, 0, 1],
                    [300, 0, 0, 1],
                    [400, 0, 0, 0],
                ]),
                (links = {
                    "3d": {
                        leftbackmiddown: [
                            [, 1, -190, 375, 532, 1.9],
                            [0, 2],
                            [1, , 190, 375, 532, 1.9],
                            [,],
                            [, 5],
                            [4],
                        ],
                        rightbackmiddown: [
                            [,],
                            [3, 4],
                            [,],
                            [, 1, -190, 375, 532, 1.9],
                            [1, 5, 190, 375, 532, 1.9],
                            [4, , 380, 375, 532, 1.9],
                        ],
                    },
                    default: [[,], [,], [,], [,], [, 5], [4]],
                });
        else if (9 == S)
            draw_boat(100, -100, -235),
                (track = [
                    [-300, 0, 0, 0],
                    [-200, 0, 0, 1],
                    [111, 0, -252, 0, 1.4],
                    [-0, 0, 0, 0],
                    [-392, 0, 422, 0, 0.3],
                    [200, 0, 0, 1],
                    [-290, 468, 225, 1, 0.65],
                    [402, 123, 0, 0, 0.5],
                    [-256, -468, 261, 1, 0.7],
                    [-160, 468, 225, 0, 0.65],
                    [-116, -468, 261, 0, 0.7],
                    [-33, 468, 225, 0, 0.65],
                    [24, -468, 261, 0, 0.7],
                    [90, 468, 225, 0, 0.65],
                    [164, -468, 261, 1, 0.7],
                    [243, -34, 153, 1, 0.32],
                    [123, 115, 439, 0, 0.5],
                    [73, 115, 439, 0, 0.5],
                    [24, 120, 210, 0, 0.52],
                    [76, 120, 210, 1, 0.52],
                    [129, 120, 210, 0, 0.52],
                ]),
                (links = {
                    "2d": {
                        frontmiddle: [
                            [, 1],
                            [0],
                            [,],
                            [,],
                            [,],
                            [,],
                            [, 8],
                            [,],
                            [6, 9, -225, 468, 225, 0.65],
                            [8, 10],
                            [9, 11, -96, 468, 225, 0.65],
                            [10, 12],
                            [11, 13, 29, 468, 225, 0.65],
                            [12, 14],
                            [13, , 153, 468, 225, 0.65],
                            [,],
                            [17],
                            [, 16],
                            [, 19],
                            [18, 20],
                            [19],
                        ],
                        up: [
                            [, 1],
                            [0],
                            [,],
                            [,],
                            [,],
                            [,],
                            [,],
                            [,],
                            [,],
                            [,],
                            [,],
                            [,],
                            [,],
                            [,],
                            [,],
                            [,],
                            [17],
                            [18, 16],
                            [, 17, 23, 115, 439, 0.5],
                            [18, 20],
                            [19],
                        ],
                        leftmidup: [
                            [, 1],
                            [0],
                            [,],
                            [,],
                            [,],
                            [,],
                            [,],
                            [20, , 181, 120, 210, 0.52],
                            [,],
                            [,],
                            [,],
                            [,],
                            [,],
                            [,],
                            [,],
                            [,],
                            [17],
                            [, 16],
                            [, 19],
                            [18, 20],
                            [19, 7],
                        ],
                    },
                    "3d": {
                        leftmidup: [
                            [, 1, -512, 0, 422, 0.3],
                            [0, 2, -482, 0, 422, 0.3],
                            [1, 3, -452, 0, 422, 0.3],
                            [2, 4, -422, 0, 422, 0.3],
                            [3, 5],
                            [4, , -362, 0, 422, 0.3],
                            [,],
                            [,],
                            [,],
                            [,],
                            [,],
                            [,],
                            [,],
                            [,],
                            [,],
                            [,],
                            [17],
                            [, 16],
                            [, 19],
                            [18, 20],
                            [19],
                        ],
                        leftbackmidup: [
                            [, 1],
                            [0],
                            [,],
                            [,],
                            [, 6],
                            [,],
                            [4, , -362, 0, 422, 0.3],
                            [,],
                            [,],
                            [,],
                            [,],
                            [,],
                            [,],
                            [,],
                            [,],
                            [,],
                            [17],
                            [, 16],
                            [, 19],
                            [18, 20],
                            [19],
                        ],
                        rightfrontmiddle: [
                            [, 1],
                            [0],
                            [,],
                            [,],
                            [,],
                            [,],
                            [,],
                            [,],
                            [,],
                            [,],
                            [,],
                            [,],
                            [, 15],
                            [,],
                            [15],
                            [12, 14, 94, -468, 261, 0.7],
                            [17],
                            [, 16],
                            [, 19],
                            [18, 20],
                            [19],
                        ],
                        rightbackmiddown: [
                            [, 1],
                            [0],
                            [,],
                            [,],
                            [,],
                            [,],
                            [,],
                            [,],
                            [,],
                            [,],
                            [,],
                            [,],
                            [,],
                            [,],
                            [,],
                            [16, , 173, 115, 439, 0.5],
                            [17, 15],
                            [, 16],
                            [, 19],
                            [18, 20],
                            [19],
                        ],
                    },
                    default: [
                        [, 1],
                        [0],
                        [,],
                        [,],
                        [,],
                        [,],
                        [,],
                        [,],
                        [,],
                        [,],
                        [,],
                        [,],
                        [,],
                        [,],
                        [,],
                        [,],
                        [17],
                        [, 16],
                        [, 19],
                        [18, 20],
                        [19],
                    ],
                });
        else if (8 == S)
            draw_boat(-230, 80, -235),
                (track = [
                    [-300, 0, 0, 0],
                    [-200, 0, 0, 1],
                    [0, 0, -1e4, 0, 1.4],
                    [200, 0, 0, 1],
                    [300, 0, 0, 0],
                    [400, 0, 0, 0],
                ]),
                draw_track(-100, 0, 0, 0),
                draw_dynamite(-100, 0, 0, 1),
                draw_track(0, 0, 0, 0),
                draw_dynamite(0, 0, 0, 2),
                draw_track(100, 0, 0, 0),
                draw_dynamite(100, 0, 0, 3),
                (group0.style.transition =
                    group1.style.transition =
                    group2.style.transition =
                    "transform 1s"),
                setTimeout(() => {
                    (d_1.innerHTML = "<img src=1f4a5.svg width=60 height=60>"),
                        navigator.vibrate && navigator.vibrate(2500),
                        viewport.classList.add("rumble2"),
                        boom(),
                        (group6.style.transition = "opacty 1s"),
                        (group6.style.opacity = "0");
                }, 4500),
                setTimeout(() => {
                    viewport.classList.remove("rumble2");
                }, 4900),
                setTimeout(() => {
                    (d_2.innerHTML = "<img src=1f4a5.svg width=60 height=60>"),
                        (d_1.innerHTML = ""),
                        C.move({ n: "group0", z: -350 }),
                        viewport.classList.add("rumble2"),
                        boom();
                }, 5e3),
                setTimeout(() => {
                    viewport.classList.remove("rumble2");
                }, 5400),
                setTimeout(() => {
                    (d_3.innerHTML = "<img src=1f4a5.svg width=60 height=60>"),
                        (d_2.innerHTML = ""),
                        C.move({ n: "group1", z: -350 }),
                        viewport.classList.add("rumble2"),
                        boom(),
                        (go = 1);
                }, 5500),
                setTimeout(() => {
                    (d_3.innerHTML = ""),
                        C.move({ n: "group2", z: -350 }),
                        navigator.vibrate && navigator.vibrate(0),
                        viewport.classList.remove("rumble2");
                }, 6e3),
                setTimeout(() => {
                    (level.innerHTML = "OK, sending you some help, catch it!"),
                        (level.style.transform = "translateY(18px)rotate(2deg)"),
                        (group0.style.display =
                            group1.style.display =
                            group2.style.display =
                            "none"),
                        C.move({ n: "group6", y: -600, z: -235 }),
                        (group6.style.opacity = 1),
                        (group6go = 1),
                        (track[2][2] = -235);
                }, 8e3),
                (links = {
                    default: [[, 1], [0], [,], [, 4], [3, 5], [4]],
                    "3d": {
                        leftfrontmidup: [[, 1], [0], [,], [, 4], [3, 5], [4]],
                        rightbackmidup: [[, 1], [0], [,], [, 4], [3, 5], [4]],
                    },
                });
        else if (10 == S) {
            draw_boat(0, 150, -235), (track = [[-300, 0, 0, 1]]);
            for (var l = 0; l < 6; l++)
                track.push([
                    700 * Math.random() - 350,
                    700 * Math.random() - 600,
                    460 * Math.random() - 230,
                    1 | Math.random(),
                    1.5 * Math.random() + 0.2,
                ]);
            track.push([400, 0, 0, 0]);
            for (l = 0; l < 10; l++)
                track.push([
                    700 * Math.random() - 350,
                    700 * Math.random() - 600,
                    460 * Math.random() - 230,
                    1 | Math.random(),
                    1.5 * Math.random() + 0.2,
                ]);
            links = {};
        }
        11 == S &&
            ((track = [
                [-300, 0, 0, 1],
                [-200, -300, 0, 1],
                [-100, -300, 0, 0],
                [0, -300, 0, 0],
                [100, -300, 0, 1],
                [-78, 23, 268, 1, 0.56],
                [-242, 243, 104, 1, 0.77],
                [390, -60, 0, 0, 1.2],
                [-165, 243, 104, 0, 0.77],
                [-88, 243, 104, 1, 0.77],
                [147, 74, 327, 1, 0.7],
                [82, 78, -200, 1, 0.75],
                [7, 78, -200, 0, 0.75],
                [-68, 78, -200, 1, 0.75],
                [582, 204, 440, 0, 2],
                [-218, 78, -200, 1, 0.75],
                [782, 204, 440, 0, 2],
                [-34, -1, -250, 0, 1.4],
                [-8, -400, 115, 1, 0.8],
            ]),
                (links = {
                    default: [
                        [,],
                        [, 2],
                        [1, 3],
                        [2, 4],
                        [3],
                        [,],
                        [, 8],
                        [,],
                        [6, 9],
                        [8],
                        [,],
                        [12],
                        [13, 11],
                        [, 12],
                        [, 16],
                        [,],
                        [14],
                        [,],
                        [,],
                    ],
                    "2d": {
                        frontmiddle: [
                            [, 1],
                            [0, 2, -200, 0, 0],
                            [1, 3, -100, 0, 0],
                            [2, 4, 0, 0, 0],
                            [3, , 100, 0, 0],
                            [,],
                            [, 8],
                            [,],
                            [6, 9],
                            [8, 18],
                            [,],
                            [12],
                            [13, 11],
                            [, 12],
                            [, 16],
                            [,],
                            [14],
                            [,],
                            [9, , -11, 243, 104, 0.77],
                        ],
                        backmiddle: [
                            [, 1],
                            [0, 2, -200, 0, 0],
                            [1, 3, -100, 0, 0],
                            [2, 4, 0, 0, 0],
                            [3, , 100, 0, 0],
                            [,],
                            [, 8],
                            [,],
                            [6, 9],
                            [8],
                            [,],
                            [12],
                            [13, 11],
                            [, 12],
                            [, 16],
                            [,],
                            [14],
                            [,],
                            [,],
                        ],
                        frontup: [
                            [,],
                            [, 2],
                            [1, 3],
                            [2, 4],
                            [3],
                            [,],
                            [, 8],
                            [,],
                            [6, 9],
                            [8],
                            [,],
                            [12],
                            [13, 11],
                            [, 12],
                            [, 16],
                            [,],
                            [14],
                            [,],
                            [,],
                        ],
                        backup: [
                            [,],
                            [, 2],
                            [1, 3],
                            [2, 4],
                            [3],
                            [,],
                            [, 8],
                            [,],
                            [6, 9],
                            [8],
                            [,],
                            [12],
                            [13, 11],
                            [, 12],
                            [, 16],
                            [,],
                            [14],
                            [,],
                            [,],
                        ],
                        up: [
                            [,],
                            [, 2],
                            [1, 3],
                            [2, 4],
                            [3],
                            [,],
                            [, 8],
                            [,],
                            [6, 9],
                            [8],
                            [11],
                            [12, 10, 77, 74, 327, 0.7],
                            [13, 11, 7, 74, 327, 0.7],
                            [, 12, -63, 74, 327, 0.7],
                            [, 16],
                            [,],
                            [14],
                            [,],
                            [,],
                        ],
                        rightbackmidup: [
                            [,],
                            [, 2],
                            [1, 3],
                            [2, 4],
                            [3],
                            [,],
                            [, 8, -63, 74, 327, 0.7],
                            [,],
                            [6, 9, 7, 74, 327, 0.7],
                            [8, 10, 77, 74, 327, 0.7],
                            [9],
                            [12],
                            [13, 11],
                            [, 12],
                            [, 16],
                            [,],
                            [14],
                            [,],
                            [,],
                        ],
                    },
                    "3d": {
                        leftmidup: [
                            [, 17],
                            [, 2],
                            [1, 3],
                            [2, 4],
                            [3],
                            [,],
                            [, 8],
                            [,],
                            [6, 9],
                            [8],
                            [,],
                            [12],
                            [13, 11],
                            [, 12],
                            [, 16],
                            [,],
                            [14],
                            [0, , -200, 0, 0],
                            [,],
                        ],
                        leftfrontmidup: [
                            [,],
                            [, 2, -302, 23, 268, 0.56],
                            [1, 3, -246, 23, 268, 0.56],
                            [2, 4, -190, 23, 268, 0.56],
                            [3, 5, -134, 23, 268, 0.56],
                            [4],
                            [, 8],
                            [,],
                            [6, 9],
                            [8],
                            [,],
                            [12],
                            [13, 11],
                            [, 12],
                            [, 16],
                            [,],
                            [14],
                            [,],
                            [,],
                        ],
                        rightbackmidup: [
                            [,],
                            [, 2],
                            [1, 3],
                            [2, 4],
                            [3],
                            [, 6],
                            [5, 8, -22, 23, 268, 0.56],
                            [,],
                            [6, 9, 34, 23, 268, 0.56],
                            [8, , 90, 23, 268, 0.56],
                            [,],
                            [12],
                            [13, 11],
                            [, 12],
                            [, 16],
                            [,],
                            [14],
                            [,],
                            [,],
                        ],
                        leftbackmiddown: [
                            [,],
                            [, 2],
                            [1, 3],
                            [2, 4],
                            [3],
                            [,],
                            [, 8],
                            [16, , 982, 204, 440, 2],
                            [6, 9],
                            [8],
                            [,],
                            [12],
                            [13, 11],
                            [, 12],
                            [, 16],
                            [,],
                            [14, 7],
                            [,],
                            [,],
                        ],
                        leftmiddown: [
                            [,],
                            [, 2],
                            [1, 3],
                            [2, 4],
                            [3],
                            [,],
                            [, 8],
                            [,],
                            [6, 9],
                            [8],
                            [,],
                            [12, , 1182, 204, 440, 2],
                            [13, 11, 982, 204, 440, 2],
                            [14, 12, 782, 204, 440, 2],
                            [15, 13],
                            [, 14, 382, 204, 440, 2],
                            [14],
                            [,],
                            [,],
                        ],
                    },
                })),
            S >= 1 &&
            (links["2d"] &&
                links["2d"].up &&
                !links["2d"].down &&
                (links["2d"].down = links["2d"].up),
                draw_tracks());
    }),
    (init = (t) => {
        if (
            ((scene.innerHTML = ""),
                (dp = "500px"),
                (C.sc = 0),
                (C.sprites = []),
                (C.pc = 0),
                (C.cc = 0),
                (go = 0),
                (chunk = 0),
                (prev_chunk = 0),
                (hud.style.opacity = 0),
                (win = 0),
                (lose = 0),
                (X = 0),
                (Y = 0),
                (Z = 0),
                (vX = 0),
                (scale = 1),
                (black.style.opacity = 0),
                (black.style.pointerEvents = "none"),
                (viewport.style.perspective = dp),
                (cam = "3d"),
                (cp = "front"),
                (ch = "midup"),
                C.camera({ rz: 0, rx: 45 }),
                (hud.style.transition = "1s"),
                (camrz = 0),
                (gc = 0),
                (cm = 300),
                (cl = -350),
                (cr = -250),
                (posonchunk = 0),
                (scale = 1),
                (dir = 1),
                S && window.h4 && (h4.style.display = "none"),
                viewport.classList.remove("rumble"),
                0 == S
                    ? viewport.classList.add("title")
                    : viewport.classList.remove("title"),
                (k[67] = 0),
                (k[88] = 0),
                (oktolose = 1),
                (group6go = 0),
                (group6y = -600),
                (cross1 = 0),
                (cross2 = 0),
                (wavesy = 0),
                (frames9 = 0),
                window.train && (train.style.transition = "none"),
                (level.style.transform = "translateY(0)rotate(0)"),
                (mobile =
                    navigator.userAgent.includes("Android") ||
                    navigator.userAgent.includes("iOS")),
                (scene.style.marginTop = S ? 0 : "20px"),
                mobile && ((all.className = "mobile"), (fullscreen = 1), onresize()),
                (easteregg7 = 0),
                setTimeout(() => {
                    viewport.style.transition = "perspective 1.5s";
                }, 1e3),
                S &&
                (level.innerHTML =
                    S +
                    ". " +
                    ([
                        ,
                        "Move the train with " +
                        (mobile
                            ? "the buttons below"
                            : "the keys X and C, or use the buttons below"),
                        1 == 1 ||
                            1 == 1 ||
                            1 == 1
                            ? "Change perspective with " +
                            (mobile
                                ? "the buttons below"
                                : "E and R, or use the buttons below")
                            : "Stolen content! Go play this game on js13kgames.com/entries/track-not-found",
                        "Optical illusions can help completing the track",
                        "Move the camera up & down with " +
                        (mobile
                            ? "the buttons below"
                            : "the arrow keys, or use the buttons below"),
                        "Success is not always a straight line",
                        "Rotate the camera to the left or the right with " +
                        (mobile ? "the buttons below" : "the other arrow keys"),
                        "This one looks easy...",
                        "What the...?!",
                        "I had to make one big level, so here it is.",
                        "To solve this one, go in the 4th dimension " +
                        (mobile
                            ? "with the button below!"
                            : "by pressing T or the button below!"),
                        "Here's the bonus level :3",
                    ][S] || "")),
                (buttons.innerHTML = ""),
                S >= 1 &&
                (self.h1 && (h1.remove(), h2.remove(), h3.remove()),
                    (buttons.innerHTML +=
                        "<button title=X id=b_back class=on>&larr; <span class=reverse><img src=1f682.svg width=25 height=25></span></button> <button title=C id=b_front class=on><span class=reverse><img src=1f682.svg width=25 height=25></span> &rarr;</button>")),
                S >= 2 &&
                (buttons.innerHTML +=
                    "<button title=E id=b_2d><span><img src=1f441.svg width=30 height=30></span> 2D</button> <button title=R id=b_3d class=on><span><img src=1f441.svg width=30 height=30></span> 3D</button>"),
                10 == S &&
                (buttons.innerHTML +=
                    "<button title=E id=b_4d><span><img src=1f441.svg width=30 height=30></span> 4D</button>"),
                S >= 4 &&
                S < 6 &&
                (buttons.innerHTML +=
                    "<div title=up class=cp1><button id=b_up class=on>&uarr;</button><br> <span><img src=1f4f7.svg width=30 height=30 style='position:relative;left:5px'></span><br><button title=down id=b_down class=on>&darr;</button></div>"),
                S >= 6 &&
                (buttons.innerHTML +=
                    "<div class=cp2><button id=b_up class=on>&uarr;</button><br><button id=b_left class=on>&larr;</button> <span><img src=1f4f7.svg width=30 height=30 style='position:relative;left:5px;top:5px'></span> <button id=b_right class=on>&rarr;</button><br><button id=b_down class=on>&darr;</button></div>"),
                S >= 1 &&
                ((b_back.onmousedown = b_back.ontouchstart =
                    (l) => {
                        k[88] = 1;
                    }),
                    (b_back.onmouseup = b_back.ontouchend =
                        (l) => {
                            k[88] = 0;
                        }),
                    (b_front.onmousedown = b_front.ontouchstart =
                        (l) => {
                            k[67] = 1;
                        }),
                    (b_front.onmouseup = b_front.ontouchend =
                        (l) => {
                            k[67] = 0;
                        })),
                S >= 2 &&
                ((b_2d.onmousedown = b_2d.ontouchstart =
                    (l) => {
                        k[69] || k[82] || "2d" == cam || !go || (k[69] = 1);
                    }),
                    (b_3d.onmousedown = b_3d.ontouchstart =
                        (l) => {
                            k[69] || k[82] || "3d" == cam || !go || (k[82] = 1);
                        })),
                10 == S &&
                (b_4d.onmousedown = b_4d.ontouchstart =
                    (l) => {
                        !k[84] && "4d" != cam && go && (k[84] = 1);
                    }),
                S >= 4 &&
                ((b_up.onmousedown = b_up.ontouchstart =
                    (l) => {
                        go && !u && (u = 1);
                    }),
                    (b_down.onmousedown = b_down.ontouchstart =
                        (l) => {
                            go && !d && (d = 1);
                        })),
                S >= 6 &&
                ((b_left.onmousedown = b_left.ontouchstart =
                    (t) => {
                        go && !l && (l = 1);
                    }),
                    (b_right.onmousedown = b_right.ontouchstart =
                        (l) => {
                            go && !r && (r = 1);
                        })),
                0 == S)
        ) {
            (h3.style.display = "block"),
                (rz = 90),
                C.camera({
                    z: -250,
                    rz: (rz += 0.5),
                    rx: 50 + 10 * Math.cos(rz / 27.5),
                }),
                C.plane({
                    w: 600,
                    h: 500,
                    z: -10,
                    b: "radial-gradient(#aea, #6b6 50%)",
                }),
                draw_train(0, 0, 1);
            for (var n = -800; n < 900; n += 100) draw_track(n, 11, 0);
            C.sprite({
                w: 60,
                h: 60,
                x: 0,
                y: -100,
                z: 0,
                html: "🌳",
                css: "tree tree1",
                o: "bottom",
            }),
                C.plane({
                    w: 60,
                    h: 60,
                    x: 0,
                    y: -100,
                    z: 0,
                    html: "🌳",
                    css: "tree shadow tree1 shadow1",
                    o: "bottom",
                    rz: -25,
                }),
                C.sprite({
                    w: 60,
                    h: 60,
                    x: 0,
                    y: -100,
                    z: 0,
                    html: "🌴",
                    css: "tree tree2",
                    o: "bottom",
                }),
                C.plane({
                    w: 60,
                    h: 60,
                    x: 0,
                    y: -100,
                    z: 0,
                    html: "🌴",
                    css: "tree shadow tree2 shadow2",
                    o: "bottom",
                    rz: -25,
                }),
                C.sprite({
                    w: 60,
                    h: 60,
                    x: 0,
                    y: 120,
                    z: 0,
                    html: "🌳",
                    css: "tree tree3",
                    o: "bottom",
                }),
                C.plane({
                    w: 60,
                    h: 60,
                    x: 0,
                    y: 120,
                    z: 0,
                    html: "🌳",
                    css: "tree shadow tree3 shadow3",
                    o: "bottom",
                    rz: -25,
                }),
                C.sprite({
                    w: 60,
                    h: 60,
                    x: 0,
                    y: -80,
                    z: 0,
                    html: "🌲",
                    css: "tree tree4",
                    o: "bottom",
                }),
                C.plane({
                    w: 60,
                    h: 60,
                    x: 0,
                    y: -80,
                    z: 0,
                    html: "🌲",
                    css: "tree shadow tree4 shadow4",
                    o: "bottom",
                    rz: -25,
                }),
                C.sprite({
                    w: 60,
                    h: 60,
                    x: 0,
                    y: 150,
                    z: 0,
                    html: "🌲",
                    css: "tree tree5",
                    o: "bottom",
                }),
                C.plane({
                    w: 60,
                    h: 60,
                    x: 0,
                    y: 150,
                    z: 0,
                    html: "🌲",
                    css: "tree shadow tree5 shadow5",
                    o: "bottom",
                    rz: -25,
                }),
                C.sprite({
                    w: 60,
                    h: 60,
                    x: 0,
                    y: -140,
                    z: 0,
                    html: "🌳",
                    css: "tree tree6",
                    o: "bottom",
                }),
                C.plane({
                    w: 60,
                    h: 60,
                    x: 0,
                    y: -140,
                    z: 0,
                    html: "🌳",
                    css: "tree shadow tree6 shadow6",
                    o: "bottom",
                    rz: -25,
                }),
                C.sprite({
                    w: 60,
                    h: 60,
                    x: 0,
                    y: 80,
                    z: 0,
                    html: "🌲",
                    css: "tree tree7",
                    o: "bottom",
                }),
                C.plane({
                    w: 60,
                    h: 60,
                    x: 0,
                    y: 80,
                    z: 0,
                    html: "🌲",
                    css: "tree shadow tree7 shadow7",
                    o: "bottom",
                    rz: -25,
                });
        }
        S >= 1 &&
            ((X = -350),
                (vX = 0),
                C.camera({ x: -400, y: 0, z: -300, rx: 30, rz: 0 }),
                draw_hills(),
                draw_train(X, 0, 0),
                C.move({ n: "train", x: -700, y: -11 }),
                setTimeout(() => {
                    (scene.style.transition = "4s"), (train.style.transition = "2s");
                }, 16),
                setTimeout(() => {
                    C.camera({ x: 0, y: 0, z: 50, rx: 45, ry: 0, rz: 0 }),
                        C.move({ n: "train", x: -350 });
                }, 33),
                setTimeout(() => {
                    hud.style.opacity = 1;
                }, 2e3),
                setTimeout(() => {
                    (train.style.transition = "none"),
                        (scene.style.transition = "1s"),
                        8 != S && (go = 1);
                }, 3e3),
                (viewport.className = "blue")),
            levels(),
            onresize(),
            S > 11 && (location = location),
            setTimeout(() => {
                S > 0 && window.boat && (boat.style.transition = ".5s");
            }, 1e3);
    }),
    (animate = () => {
        setInterval(() => {
            0 == S &&
                C.camera({
                    z: -300,
                    rz: (rz += 0.5),
                    rx: 50 + 10 * Math.cos(rz / 27.5),
                }),
                S >= 1 &&
                (vX && (vX *= 0.95),
                    go && k[67] && vX < (scale < 1 ? 7 * scale : 7)
                        ? ((vX += scale < 1 ? 0.2 * scale : 0.2), (dir = 1))
                        : go &&
                        k[88] &&
                        vX < (scale < 1 ? 5 * scale : 5) &&
                        ((vX -= scale < 1 ? 0.2 * scale : 0.2), (dir = 0)),
                    !go ||
                    win ||
                    lose ||
                    ((X += vX),
                        X < -400 && 0 == Y && 1 == scale && ((X = -400), (vX = 0)),
                        C.move({ n: "train", x: X, y: Y - 10 * scale, z: Z })),
                    (7 == chunk || (track.length < 8 && chunk == track.length - 1)) &&
                    posonchunk > 0.75 &&
                    ((X = 0),
                        (win = 1),
                        7 != S ||
                        easteregg7 ||
                        (localStorage["OS13kTrophy,🚂,Track Not Found,Bridge saver"] =
                            "You didn't destroy the bridge in Track not Found"),
                        (train.style.transition = hud.style.transition = "1s"),
                        (viewport.style.transition = "none"),
                        C.move({ n: "train", x: 800 }),
                        (hud.style.opacity = 0),
                        (go = 0),
                        setTimeout(() => {
                            black.style.opacity = 1;
                        }, 800),
                        setTimeout(() => {
                            (scene.style.transition = "none"),
                                (viewport.style.perspective = dp),
                                S++,
                                init();
                        }, 1500)),
                    (link = getlink()),
                    link &&
                    ((cm = link[chunk].length > 2 ? link[chunk][2] : track[chunk][0]),
                        (scale =
                            (link[chunk].length > 2 ? link[chunk][5] : track[chunk][4]) ||
                            1),
                        (cl = cm - 50 * scale),
                        (cr = cm + 50 * scale),
                        Math.abs(vX) > 0.1 && (posonchunk = (X - cl) / (cr - cl)),
                        7 == S &&
                        1 == chunk &&
                        posonchunk > 0.5 &&
                        !easteregg7 &&
                        cp + ch == "leftbackmiddown" &&
                        ((easteregg7 = 1),
                            (group0.style.transition = "3s"),
                            viewport.classList.add("rumble"),
                            (level.innerHTML =
                                "Ooops, sorry, you'll need to find another way!"),
                            (level.style.transform = "translateY(27px)rotate(3deg)"),
                            navigator.vibrate && navigator.vibrate(500),
                            C.move({ n: "group0", rx: 90, y: -600, z: -600 }),
                            (oktolose = 0),
                            setTimeout(() => {
                                group0.remove(),
                                    navigator.vibrate && navigator.vibrate(0),
                                    (oktolose = 1),
                                    viewport.classList.remove("rumble");
                            }, 3e3)),
                        8 == S &&
                        group6go &&
                        (C.move({ n: "group6", y: (group6y += 0.9) }),
                            group6y > 600 && (2 == chunk ? (lose = 1) : (group6y = -600))),
                        posonchunk > 1 &&
                        (undefined !== link[chunk][1]
                            ? ((posonchunk -= 1),
                                posonchunk < 0 && (posonchunk = 0),
                                (chunk = link[chunk][1]))
                            : (lose = 1)),
                        3 == S && 1 == chunk && "2d" == cam && X < -318
                            ? ((vX = 0),
                                (X = -318),
                                (posonchunk = 0.25),
                                (localStorage["OS13kTrophy,🚂,Track Not Found,Bonk"] =
                                    "You bonked on the mountain in Track not Found"))
                            : posonchunk < 0 &&
                            0 != chunk &&
                            (undefined !== link[chunk][0]
                                ? ((posonchunk += 1),
                                    posonchunk < 1 && (posonchunk = 1),
                                    (chunk = link[chunk][0]))
                                : (lose = 1)),
                        lose &&
                        go &&
                        (ww(),
                            (train.style.transition = ".5s"),
                            (scene.style.transition = "1s"),
                            (hud.style.transition = "none"),
                            (hud.style.opacity = "0"),
                            (go = 0),
                            0 == dir
                                ? C.move({ n: "train", x: (X -= 30), z: (Z -= 30), ry: -90 })
                                : C.move({ n: "train", x: (X += 30), z: (Z -= 30), ry: 90 }),
                            (black.style.opacity = 1),
                            setTimeout(() => {
                                C.move({ n: "train", z: (Z -= 70) });
                            }, 200),
                            setTimeout(
                                () => {
                                    (scene.style.transition = "none"), init();
                                },
                                oktolose ? 1e3 : 3e3
                            )))),
                S >= 2 &&
                (k[69] &&
                    "2d" != cam &&
                    go &&
                    !win &&
                    !lose &&
                    ((b_2d.className = "on"),
                        (b_3d.className = ""),
                        (vX = 0),
                        (cam = "2d"),
                        S < 8 &&
                        6 != S &&
                        ("midup" == ch || "middown" == ch) &&
                        (ch = "middle"),
                        traintoreal(),
                        camera(),
                        setTimeout(ttn, 1500),
                        (k[69] = 0)),
                    k[82] &&
                    "3d" != cam &&
                    go &&
                    !win &&
                    !lose &&
                    ((b_3d.className = "on"),
                        (b_2d.className = ""),
                        (vX = 0),
                        (cam = "3d"),
                        S < 8 && (ch = "midup"),
                        traintoreal(),
                        camera(),
                        setTimeout(ttn, 1500),
                        (k[82] = 0)),
                    10 == S &&
                    k[84] &&
                    "4d" != cam &&
                    go &&
                    !win &&
                    !lose &&
                    ((b_4d.className = "on"),
                        (b_2d.className = ""),
                        (b_3d.className = ""),
                        (vX = 0),
                        (cam = "4d"),
                        (black.style.pointerEvents = "all"),
                        camera(),
                        (k[84] = 0))),
                S >= 4 &&
                (go &&
                    u &&
                    !win &&
                    !lose &&
                    "up" != ch &&
                    ((vX = 0),
                        "midup" == ch
                            ? (ch = "up")
                            : "middle" == ch
                                ? (ch = "midup")
                                : "middown" == ch
                                    ? (ch = "middle")
                                    : "down" == ch && (ch = "middown"),
                        traintoreal(),
                        camera(),
                        setTimeout(ttn, 8 == S ? 300 : 1e3),
                        (u = 0)),
                    go &&
                    d &&
                    !win &&
                    !lose &&
                    "down" != ch &&
                    ((vX = 0),
                        "up" == ch
                            ? (ch = "midup")
                            : "midup" == ch
                                ? (ch = "middle")
                                : "middle" == ch
                                    ? (ch = "middown")
                                    : "middown" == ch && (ch = "down"),
                        traintoreal(),
                        camera(),
                        setTimeout(ttn, 8 == S ? 300 : 1e3),
                        (d = 0))),
                S >= 6 &&
                (go &&
                    l &&
                    !win &&
                    !lose &&
                    ((vX = 0),
                        "right" == cp
                            ? (cp = "rightfront")
                            : "rightfront" == cp
                                ? (cp = "front")
                                : "front" == cp
                                    ? (cp = "leftfront")
                                    : "leftfront" == cp
                                        ? (cp = "left")
                                        : "left" == cp
                                            ? (cp = "leftback")
                                            : "leftback" == cp
                                                ? (cp = "back")
                                                : "back" == cp
                                                    ? (cp = "rightback")
                                                    : "rightback" == cp && (cp = "right"),
                        C.camera({ rz: (camrz -= 45) }),
                        traintoreal(),
                        camera(),
                        setTimeout(ttn, 8 == S ? 300 : 1e3),
                        (l = 0)),
                    go &&
                    r &&
                    !win &&
                    !lose &&
                    ((vX = 0),
                        "right" == cp
                            ? (cp = "rightback")
                            : "rightback" == cp
                                ? (cp = "back")
                                : "back" == cp
                                    ? (cp = "leftback")
                                    : "leftback" == cp
                                        ? (cp = "left")
                                        : "left" == cp
                                            ? (cp = "leftfront")
                                            : "leftfront" == cp
                                                ? (cp = "front")
                                                : "front" == cp
                                                    ? (cp = "rightfront")
                                                    : "rightfront" == cp && (cp = "right"),
                        C.camera({ rz: (camrz += 45) }),
                        traintoreal(),
                        camera(),
                        setTimeout(ttn, 8 == S ? 300 : 1e3),
                        (r = 0))),
                8 == S && group6y < -150 && group6y > -200 && !cross1
                    ? (links["3d"].leftfrontmidup = [
                        [, 1],
                        [0, 2],
                        [1],
                        [, 4],
                        [3, 5],
                        [4],
                    ])
                    : 8 == S &&
                    (links["3d"].leftfrontmidup = [
                        [, 1],
                        [0],
                        [,],
                        [, 4],
                        [3, 5],
                        [4],
                    ]),
                8 == S && group6y > 150 && group6y < 200
                    ? ((links["3d"].rightbackmidup = [
                        [, 1],
                        [0],
                        [, 3],
                        [2, 4],
                        [3, 5],
                        [4],
                    ]),
                        (links["3d"].leftbackmidup = [
                            [, 1],
                            [0, 2],
                            [1],
                            [, 4],
                            [3, 5],
                            [4],
                        ]))
                    : 8 == S &&
                    ((links["3d"].rightbackmidup = [
                        [, 1],
                        [0],
                        [,],
                        [, 4],
                        [3, 5],
                        [4],
                    ]),
                        (links["3d"].leftbackmidup = [
                            [, 1],
                            [0],
                            [,],
                            [, 4],
                            [3, 5],
                            [4],
                        ])),
                8 != S ||
                cross1 ||
                2 != chunk ||
                ((Z = -235),
                    (scale = 1.4),
                    (X = -35),
                    (vX = 0),
                    (chunkscale = 1.4),
                    (cm = 0),
                    (cl = -70),
                    (cr = 70),
                    (posonchunk = 0.25),
                    (cross1 = 1),
                    (train.style.transition = "transform .1s"),
                    (go = 0),
                    setTimeout(() => {
                        C.move({
                            n: "train",
                            x: X,
                            y: group6y - 11,
                            z: Z,
                            sx: 1.4,
                            sy: 1.4,
                            sz: 1.4,
                        });
                    }, 33),
                    setTimeout(() => {
                        (go = 1), lose || (train.style.transition = "none");
                    }, 250)),
                8 == S &&
                2 == chunk &&
                ((Y = group6y - 11), C.move({ n: "train", y: Y })),
                8 != S ||
                cross2 ||
                3 != chunk ||
                ((Z = 0),
                    (scale = 1),
                    (X = 151),
                    (Y = 0),
                    (vX = 0),
                    (chunkscale = 1),
                    (cm = 200),
                    (cl = 150),
                    (cr = 250),
                    (posonchunk = 0.01),
                    (cross2 = 1),
                    (train.style.transition = "transform .1s"),
                    (go = 0),
                    setTimeout(() => {
                        C.move({ n: "train", x: X, y: 0, z: Z, sx: 1, sy: 1, sz: 1 });
                    }, 33),
                    setTimeout(() => {
                        (go = 1), lose || (train.style.transition = "none");
                    }, 250)),
                9 == S &&
                (frames9++,
                    3600 == frames9 &&
                    ((level.innerHTML =
                        'Don\'t like this level? <button class=mini onclick=\'win=1;black.style.opacity=1;hud.style.opacity=0;train.style.transition=hud.style.transition="1s";viewport.style.transition="none";setTimeout(()=>{scene.style.transition="none";viewport.style.perspective=dp;S++;init();},1500);\'>click here to skip it :/'),
                        (level.style.transform = "translateY(18px)rotate(2deg)"))),
                window.river2 &&
                ((river2.style.backgroundPosition = "center " + wavesy + "px"),
                    (wavesy += 0.5));
        }, 16);
    }),
    (getlink = () =>
    (link =
        (links[cam] &&
            (links[cam][cp + ch] || links[cam][cp] || links[cam][ch])) ||
        links.default)),
    (traintoreal = () => {
        link &&
            (8 != S || !group6y || (2 != chunk && 3 != chunk)) &&
            ((go = 0),
                (link = getlink()),
                (cm = track[chunk][0]),
                (scale = track[chunk][4] || 1),
                (cl = cm - 50 * scale),
                (cr = cm + 50 * scale),
                (X = cl + (cr - cl) * posonchunk),
                (Y = 8 == S && group6y && 2 == chunk ? group6y + 11 : track[chunk][1]),
                (Z = track[chunk][2]),
                C.move({
                    n: "train",
                    x: X,
                    y: Y - 10 * scale,
                    z: Z,
                    sx: scale,
                    sy: scale,
                    sz: scale,
                }));
    }),
    (ttn = () => {
        link &&
            (8 != S || !group6y || (2 != chunk && 3 != chunk)) &&
            ((link = getlink()),
                (cm = link[chunk].length > 2 ? link[chunk][2] : track[chunk][0]),
                (scale =
                    (link[chunk].length > 2 ? link[chunk][5] : track[chunk][4]) || 1),
                (cl = cm - 50 * scale),
                (cr = cm + 50 * scale),
                (X = cl + (cr - cl) * posonchunk),
                (Y =
                    8 == S && group6y && 2 == chunk
                        ? group6y + 11
                        : link[chunk].length >= 5
                            ? link[chunk][3]
                            : track[chunk][1]),
                (Z = link[chunk].length >= 5 ? link[chunk][4] : track[chunk][2]),
                C.move({
                    n: "train",
                    x: X,
                    y: Y - 10 * scale,
                    z: Z,
                    sx: scale,
                    sy: scale,
                    sz: scale,
                }),
                (go = 1));
    }),
    (h3.onmousedown = h3.ontouchstart =
        (l) => {
            switch (S) {
                case 0:
                    (black.style.opacity = 1),
                        window.h4 && h4.remove(),
                        mu(),
                        setTimeout(() => {
                            (S = 1), init();
                        }, 1500);
            }
        }),
    (h4.onclick = () => {
        (fullscreen = 1 - fullscreen),
            fullscreen
                ? document.body.requestFullscreen()
                : document.exitFullscreen(),
            onresize();
    }),
    (k = []),
    (u = l = d = r = 0),
    (skiptimer = 0),
    (onkeydown = onkeyup =
        (t) => {
            (k[t.which] = t.type[5]),
                (38 != t.which && 90 != t.which && 87 != t.which) || (u = t.type[5]),
                (37 != t.which && 81 != t.which && 65 != t.which) || (l = t.type[5]),
                (40 != t.which && 83 != t.which) || (d = t.type[5]),
                (39 != t.which && 68 != t.which) || (r = t.type[5]),
                27 == t.which &&
                S &&
                S < 11 &&
                !skiptimer &&
                ((win = 1),
                    (skiptimer = 1),
                    setTimeout(
                        () => {
                            skiptimer = 0;
                        },
                        8 == S ? 1e4 : 3e3
                    ),
                    (black.style.opacity = 1),
                    (hud.style.opacity = 0),
                    (train.style.transition = hud.style.transition = "1s"),
                    (viewport.style.transition = "none"),
                    setTimeout(() => {
                        (scene.style.transition = "none"),
                            (viewport.style.perspective = dp),
                            S++,
                            init();
                    }, 1500));
        }),
    (onresize = () => {
        fullscreen
            ? window.innerWidth / window.innerHeight > 1.875
                ? (all.style.transform = "scale(" + window.innerHeight / 480 + ")")
                : (all.style.transform = "scale(" + window.innerWidth / 900 + ")")
            : (all.style.transform = "");
    }),
    (camera = () => {
        if ("2d" == cam) viewport.style.perspective = "6000px";
        else if ("3d" == cam) viewport.style.perspective = dp;
        else if ("4d" == cam) {
            (cp = "front"),
                C.camera({ z: "3d" == cam ? 50 : 300 }),
                (ch = "midup"),
                C.camera({ rx: 45 }),
                (go = 0),
                viewport.classList.add("rumble"),
                (train.style.transition = "10s"),
                (scale = chunkscale = 5),
                C.move({
                    n: "train",
                    x: 600,
                    y: 900,
                    z: 600,
                    rz: 90,
                    sx: scale,
                    sy: scale,
                    sz: scale,
                }),
                (C.sprites = []);
            var l = document.querySelectorAll("#scene > *");
            for (var t in l)
                !l[t].style ||
                    l[t].classList.contains("river") ||
                    "train" == l[t].parentNode.id ||
                    l[t].id.includes("h2") ||
                    l[t].id.includes("h3") ||
                    ((l[t].style.transition = "10s"),
                        (l[t].style.transform +=
                            "rotateX(" +
                            (Math.random() > 0.5 ? "-" : "") +
                            "45deg)rotateY(" +
                            (Math.random() > 0.5 ? "-" : "") +
                            "45deg)rotateZ(" +
                            (Math.random() > 0.5 ? "-" : "") +
                            "45deg)scaleX(2)scaleY(2)scaleZ(2)"));
            (viewport.style.transition = "9.5s"),
                setTimeout(() => {
                    (viewport.style.perspective = "10px"),
                        (level.innerHTML = "AAAAAAAAAAAAAAHHHHHHHH!"),
                        (hud.style.opacity = 0);
                }, 500),
                setTimeout(() => {
                    (black.style.opacity = 1),
                        (black.innerHTML =
                            "<h1>404: dimension not found!</h1><h2>Please download a browser that supports CSS 4D.</h2><h3>(Just kidding, you finished the game. Thanks for playing!<br><br><a target=_blank href='//xem.github.io/articles/js13k20.html'>Read the making-of</a><br><br><a target=_blank href='https://twitter.com/intent/tweet?text=I%20played%20Track%20Not%20Found%2C%20a%2013kb%20game%20by%20%40MaximeEuziere%0ATry%20it%20here%3A%20http%3A%2F%2Fjs13kgames.com%2Fentries%2Ftrack-not-found'>Tweet</a><br><br><button class=mini " +
                            (document.monetization && "started" === document.monetization.S
                                ? ""
                                : "disabled") +
                            " onclick='S=11;init();black.style.display=\"none\"'>Bonus level for Coil members</button>"),
                        (localStorage["OS13kTrophy,🚂,Track Not Found,100%"] =
                            "You completed the game Track not Found");
                }, 1e4);
        }
        "front" == cp
            ? C.camera({ z: "3d" == cam ? 50 : 300 })
            : "left" == cp || "leftfront" == cp || "leftback" == cp
                ? C.camera({ z: "middle" == ch ? 50 : "3d" == cam ? 350 : 3500 })
                : "back" == cp
                    ? C.camera({ z: "3d" == cam ? 90 : 300 })
                    : ("right" == cp || "rightfront" == cp || "rightback" == cp) &&
                    C.camera({ z: "middle" == ch ? 50 : "3d" == cam ? 350 : 3500 }),
            "up" == ch
                ? (C.camera({ rx: "3d" == cam ? 5 : 0 }),
                    window.boat && (boat.style.opacity = 0))
                : "midup" == ch
                    ? (C.camera({ rx: 45 }),
                        window.boat && (boat.style.opacity = 1),
                        setTimeout(() => {
                            h2left.style.opacity =
                                h3left.style.opacity =
                                h2right.style.opacity =
                                h3right.style.opacity =
                                1;
                        }, 900),
                        setTimeout(() => {
                            (river.style.opacity = 1),
                                window.river2 && (river2.style.opacity = 1);
                        }, 500))
                    : "middle" == ch
                        ? (C.camera({
                            rx: "3d" == cam || "left" == cp || "right" == cp ? 85 : 90,
                        }),
                            window.boat && (boat.style.opacity = 1),
                            setTimeout(() => {
                                h2left.style.opacity =
                                    h3left.style.opacity =
                                    h2right.style.opacity =
                                    h3right.style.opacity =
                                    1;
                            }, 900),
                            setTimeout(() => {
                                (river.style.opacity = 1),
                                    window.river2 && (river2.style.opacity = 1);
                            }, 500))
                        : "middown" == ch
                            ? (C.camera({ rx: 135 }),
                                window.boat && (boat.style.opacity = 0),
                                (river.style.opacity = 0),
                                window.river2 && (river2.style.opacity = 0),
                                "3d" == cam &&
                                ("left" == cp || "leftfront" == cp || "leftback" == cp
                                    ? ((h2left.style.opacity = 0), (h3left.style.opacity = 0))
                                    : setTimeout(() => {
                                        (h2left.style.opacity = 1), (h3left.style.opacity = 1);
                                    }, 900),
                                    "right" == cp || "rightfront" == cp || "rightback" == cp
                                        ? ((h2right.style.opacity = 0), (h3right.style.opacity = 0))
                                        : setTimeout(() => {
                                            (h2right.style.opacity = 1), (h3right.style.opacity = 1);
                                        }, 900)),
                                "2d" == cam &&
                                (h2left.style.opacity =
                                    h3left.style.opacity =
                                    h2right.style.opacity =
                                    h3right.style.opacity =
                                    0))
                            : "down" == ch &&
                            (C.camera({ rx: "3d" == cam ? 175 : 180 }),
                                "3d" == cam
                                    ? (h2left.style.opacity =
                                        h3left.style.opacity =
                                        h2right.style.opacity =
                                        h3right.style.opacity =
                                        1)
                                    : (h2left.style.opacity =
                                        h3left.style.opacity =
                                        h2right.style.opacity =
                                        h3right.style.opacity =
                                        0));
    }),
    (boom = () => {
        for (
            var l = function (l) {
                return l > 3e4
                    ? null
                    : (200 & Math.pow(l + 1e3 * Math.sin(0.01 * l), 0.8)
                        ? 0.5
                        : -0.5) * Math.pow(t(l, 3e4), 1);
            },
            t = (l, t) => (t - l) / t,
            n = new AudioContext(),
            e = n.createBuffer(1, 96e3, 48e3),
            a = e.getChannelData(0),
            u = 96e3;
            u--;

        )
            a[u] = l(u) / 5;
        var o = n.createBufferSource();
        (o.buffer = e), o.connect(n.destination), o.start();
    }),
    (ww = () => {
        var l = function (l) {
            return (l = 1.3 * Math.pow(l, 0.96)) > 5e4
                ? null
                : ((l + 80 * Math.sin(l / 1900)) & 64 ? 1 : -1) *
                Math.pow(t(l, 5e4), 3);
        },
            t = (l, t) => (t - l) / t,
            n = new AudioContext(),
            e = n.createBuffer(1, 96e3, 48e3),
            a = e.getChannelData(0);
        for (i = 96e3; i--;) a[i] = l(i) / 5;
        var u = n.createBufferSource();
        (u.buffer = e), u.connect(n.destination), u.start();
    }),
    (mu = () => {
        (n = -3), (A = new AudioContext()), (G = A.createGain()), note();
    }),
    (note = () => {
        var l = [
            "`dgd`dgd`dgd`dgdbeiebeiebeiebeieY]`]Y]`]Y]`]Y]`][_b_[_b_[_b_[_b_",
            "l(((k(((g(((((gkl(((n(((n(p(pnlki(((((((i(((k(ikl(((n(((((nlkgik",
        ];
        S &&
            ((O1 = A.createOscillator()),
                (O2 = A.createOscillator()),
                S &&
                "(" != l[0][n % 64] &&
                (O1.connect(G),
                    G.connect(A.destination),
                    O1.start(A.currentTime),
                    O1.frequency.setValueAtTime(
                        440 * 1.06 ** (n >= 0 ? -105 + l[0].charCodeAt(n % 64) : 0),
                        A.currentTime
                    ),
                    (O1.type =
                        "2d" == cam ? "sine" : "3d" == cam ? "triangle" : "square"),
                    G.gain.setValueAtTime(
                        n >= 0 ? 0.06 : 1e-4,
                        A.currentTime + ("4d" == cam ? Math.random() / 3 : 0)
                    ),
                    G.gain.setTargetAtTime(
                        0.001,
                        A.currentTime + ("4d" == cam ? Math.random() / 4 : 0.1),
                        0.05
                    ),
                    O1.stop(A.currentTime + ("4d" == cam ? Math.random() / 3 : 0.24))),
                S &&
                "(" != l[1][n % 64] &&
                (O2.connect(G),
                    G.connect(A.destination),
                    O2.start(A.currentTime),
                    O2.frequency.setValueAtTime(
                        440 * 1.06 ** (n >= 0 ? -105 + l[1].charCodeAt(n % 64) : 0),
                        A.currentTime
                    ),
                    (O2.type =
                        "2d" == cam ? "sine" : "3d" == cam ? "triangle" : "square"),
                    G.gain.setValueAtTime(
                        n >= 0 ? 0.08 : 1e-4,
                        A.currentTime + ("4d" == cam ? Math.random() / 3 : 0)
                    ),
                    G.gain.setTargetAtTime(
                        0.001,
                        A.currentTime + ("4d" == cam ? Math.random() / 4 : 0.1),
                        0.05
                    ),
                    O2.stop(A.currentTime + ("4d" == cam ? Math.random() / 3 : 0.24))),
                n++),
            setTimeout(note, 270 + ("4d" == cam ? Math.random() / 2 - 0.25 : 0));
    });
onload = () => {
    fullscreen = 0;
    S = 0;
    _ = 0;
    onresize();
    init();
    animate();
};