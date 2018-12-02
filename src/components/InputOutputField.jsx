import React from 'react'

class InputOutputField extends React.Component{
	constructor(){
		super();
        this.state = {
            text: 'ここに出力されます(要3文字以上入力)'
        }
		this.handleChange = this.handleChange.bind(this)
	}
	handleChange(e){
		let that = this;
		fetch('http://localhost:4567/conv/wakati',{
			method: "POST",
			body: JSON.stringify({
				text: e.target.value
			})
		})
			.then(function(response){
				return response.json();
			}).then(function(j){
				console.log(JSON.stringify(j));
				let result = JSON.stringify(j);
				that.setState({
					text: result.split(" ").join("\n")
				});
			});
	}
	render(){
		return (
			<div>
			  <textarea id="InputTextArea" onChange={this.handleChange}>
			  </textarea>
			  <pre id="OutputPre">{this.state.text}</pre>
			</div>
		)
	}
}
export default InputOutputField
