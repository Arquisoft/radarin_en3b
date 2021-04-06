import React from "react";

export default function MainGrid() {
    return (
        <div className="d-flex justify-content-between">
            <div class="row">
                <div className="col-9">Hola izquierda</div>
                <div className="col-9"><span className="float-right">Hola derecha</span></div>
            </div>
        </div>

    );
}
