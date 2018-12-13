import React from 'react';

export default class CanvasComponent extends React.Component {
    constructor(props) {
        super(props);
        this.canvasRef={};
        this.props.canvases.map((value,index)=> {
            let id = index;
            return <canvas ref={(ref) => this.canvasRefs[`canvas${id}`] = ref}></canvas>
       })
    };

    
    componentDidMount() {
        this.updateCanvas();
        
    }
    updateCanvas() {
        // const ctx = this.refs.canvas.getContext('2d');
        // ctx.lineWidth = 2;
        // ctx.strokeStyle = 'white';
        // ctx.fillStyle = 'white';
    }
    render() {
        const canvas = document.createElement('canvas');
        const cv = canvas.getContext('2d');
        cv.fillRect(0,0, 100, 100);

        return (
            <div>
                {cv}
            </div>
        );
    }
}

// ReactDOM.render(<CanvasComponent/>, document.getElementById('container'));