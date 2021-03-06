import React from "react";

class MainGrid extends React.Component {
    render() {
        return (
            <div className="d-flex justify-content-between">
                <div class="row">
                    <div className="col-9">Hola izquierda</div>
                    <div className="col-9"><span className="float-right">Hola derecha</span></div>
                </div>
            </div>

        );
    }
}

export default MainGrid;