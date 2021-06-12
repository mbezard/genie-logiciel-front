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
    const colors = ["green", "orange" , "yellow"]
    for(let i=0; i<colors.length;i++) {
        if(score > (max - i) / colors.length) return colors[i]
    }
}
