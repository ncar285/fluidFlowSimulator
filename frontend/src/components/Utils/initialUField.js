
export const generatreInitialField = () => {
    const uField = {};
    const velocity = {u: 40, v: 0};    // pixels per second
    for (let x = 0 ; x < 900 ; x++ ){
        for (let y = 0 ; y < 500 ; y++ ){
            let key = `${x},${y}`;
            uField[key] = velocity;
        }
    }
    return uField;
}

