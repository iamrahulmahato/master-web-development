import React, {useState, useRef} from 'react'

export default function Textform(props) {
    const handleUpclick=()=>{
        let newText = text.toUpperCase();
        setText(newText);
    }
    const handleDownclick=()=>{
      let newText = text.toLowerCase();
      setText(newText);
  }
    const handleonchange=(event)=>{
        setText(event.target.value)
    }
    const [text, setText] = useState("");
    const inputRef= useRef(null)
    const handleCopy = () => {
      inputRef.current.select();
      document.execCommand('copy');
      alert('Text copied to clipboard!');
    };
    const handleClear = () => {
      setText('');
      inputRef.current.focus();
    };
    const handleSpeak = () => {
      if (text.trim() !== '') {
        const utterance = new SpeechSynthesisUtterance(text);
        speechSynthesis.speak(utterance);
      }
    }
  return (
    <div className="container mt-5">
    <div>
            <h1>{props.heading}</h1>
            <h1>Enter something here</h1>
<div className="mb-3">

  <textarea className="form-control"  ref={inputRef} value={text} id="box2" onChange={handleonchange} rows="8"></textarea>
</div>
<button className="btn btn-primary mx-1"onClick={handleUpclick}>Convert to uppercase</button> 
<button className="btn btn-primary mx-1"onClick={handleDownclick}>Convert to lowercase</button> 
<button className="btn btn-primary mx-1" onClick={handleCopy}> Copy Text</button>
<button className="btn btn-primary mx-1" onClick={handleClear}>Clear Text</button>
<button className="btn btn-primary mx-1" onClick={handleSpeak}>
                Speak
              </button>
   </div>
    <div className="container my-3"> 
    <h1>Your text summary</h1>
    <p>Your text has {text.split(" ").length} words and {text.length} characters </p>
    <p>{0.008*text.split(" ").length} Minute to read</p>
    <h3>Preview</h3>
    <p>{text}</p>
    </div>
    </div>
  )
}
