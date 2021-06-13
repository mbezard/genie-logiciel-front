export const getColorFromScore = (score, max) => {
    let red = 64;
    let green = 203;
    let blue = 91;

    const neutral = 60;

    red = (score / max) * (red - neutral) + neutral
    green = (score / max) * (green - neutral) + neutral
    blue = (score / max) * (blue - neutral) + neutral
    return "rgb(" + Math.floor(red) + "," + Math.floor(green) + "," + Math.floor(blue) + ")"
}

export const getColorLabelFromScore = (score, max) => {
    // const colors = ["green", "orange" , "yellow"]
    // const colors = ["green", "teal" , "linen", "orange"]
    const colors = ["red", "linen", "orange", "yellow"]
    for(let i=1; i<colors.length;i++) {
        if(score > (max) * ((colors.length - i) / colors.length)) return colors[i-1]
    }
    return colors[colors.length - 1];
}
