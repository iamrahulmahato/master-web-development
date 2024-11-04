var name1;
var name2;
const button = document.getElementById('check-button');
if(button){
    button.addEventListener('click',function(event){
        event.preventDefault();
        name1 = document.getElementById("first-name").value;
        name2 = document.getElementById("second-name").value;
        name1 = name1.trim();
        name1 = name1.toLowerCase();
        name2 = name2.trim();
        name2 = name2.toLowerCase();
        name1 = name1.replace(' ','');
        name2 = name2.replace(' ','');
        name1 = Array.from(new Set(name1)).join('');
        name2 = Array.from(new Set(name2)).join('');
        console.log(name1);
        console.log(name2);
        const flames = ['Sister','Friend','Love','Affection','Marriage','Enemy'];
        if (name1 == '' || name2 == '') {
            alert("Please enter both names.");
            return;
        }
        var counter=0;
        for(let i=0;i<name1.length;i++){

            for(let j=0;j<name2.length;j++)
            {
                if(name1[i] == name2[j]){
                    counter+=1;
                }
            }
        }
        const index = (counter+1)%6;
        const result = flames[index];
        document.getElementById("resultant").innerText = result;
        document.getElementById("main1").style.display = "flex";
    });
}
else{
    console.error('Element not found');
}