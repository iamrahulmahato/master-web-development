import '../assets/css/game.css'

export default function Game(){
    const getRandomName=animals[Math.floor(Math.random() * 16) + 1].name;
    const [status,setStatus]=useState('');
    return(
        <>
            <div className="item1">
                <h1>ANIMAL MATCHING GAME</h1>
            </div>
            <div className="item2">
                <h3>Result</h3>
                <h5 className="animal-name"></h5>
            </div>
            <div className="item3">
                <h3>Animal Name</h3>
                <h5 className="animal-name"></h5>
            </div>
            <div className="item4">
                <h3>Select the Animal</h3>
                <div className="grid-container">                
					<div className="grid-item">
						<img className="animal-img" src=""/>
					</div> 
                </div>
            </div>
        </>
    )
}