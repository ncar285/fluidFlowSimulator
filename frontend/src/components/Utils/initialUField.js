
export const generatePlainVelocityField = (speed) => {
    const uField = {};
    const velocity = {u: speed, v: 0};    // pixels per second
    for (let x = 0 ; x < 900 ; x++ ){
        for (let y = 0 ; y < 500 ; y++ ){
            let key = `${x},${y}`;
            uField[key] = velocity;
        }
    }
    return uField;
}

