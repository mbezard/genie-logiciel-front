import {StyleSheet} from "react-native";

const stylesUtils = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerCenter: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    }
});


export function padding(a, b, c, d) {
    return {
        paddingTop: a,
        paddingRight: b ? b : a,
        paddingBottom: c ? c : a,
        paddingLeft: d ? d : (b ? b : a)
    }
}


export function margin(a, b, c, d) {
    return {
        marginTop: a,
        marginRight: b ? b : a,
        marginBottom: c ? c : a,
        marginLeft: d ? d : (b ? b : a)
    }
}

export default stylesUtils;