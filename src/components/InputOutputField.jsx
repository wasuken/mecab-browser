import React from 'react'
import VariableTextArea from './VariableTextArea'

class InputOutputField extends React.Component{
	constructor(){
		super();
        this.state = {
            text: 'ここに出力されます(要3文字以上入力)',
			isUrl: false
        }
		this.handleChange = this.handleChange.bind(this);
		this.checkboxHandle = this.checkboxHandle.bind(this);
	}
	handleChange(e){
		let that = this;
		let url = this.state.isUrl?
			'http://localhost:4567/conv/web' : 'http://localhost:4567/conv/wakati';
		fetch(url,{
			method: "POST",
			body: JSON.stringify(this.state.isUrl?
								 {url: e.target.value}:
								 {text: e.target.value})
		})
			.then(function(response){
				return response.json();
			}).then(function(j){
				console.log(JSON.stringify(j));
				let result = JSON.stringify(j);
				that.setState({
					text: result.split(" ").join("\n"),
					isUrl: that.state.isUrl
				});
			});
	}
	checkboxHandle(e){
		this.state = {
			text: this.state.text,
            isUrl: !this.state.isUrl
        }
	}
	render(){
		return (
			<div>
			  <VariableTextArea id="InputTextArea" size="8" row="1" onChange={this.handleChange}>
			  </VariableTextArea>
			  <input type="checkbox" value="url" onChange={this.checkboxHandle} />
			  <pre id="OutputPre">{this.state.text}</pre>
			</div>
		)
	}
}
export default InputOutputField
