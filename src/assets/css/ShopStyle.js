import { makeStyles } from '@mui/styles';
import * as CONST from "../../utils/Constants";
const useStyles = makeStyles((theme) => ({
    overlay_box: {
        background: 'rgba(0,0,0,.5)',
        height: '178px',
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        overflow: 'hidden'
    },
    overlay_img: {
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
        width: '100%',
        height: '230px'
    },
    overlay_txt: {
        position: 'absolute',
        color: 'white',
        margin: '0 auto',
        justifyContent: 'center',
        paddingTop: '71px',
        fontSize: '30px'
    },
    product_box: {
        maxWidth: '1170px',
        paddingRight: '15px',
        paddingLeft: '15px',
        marginRight: 'auto',
        marginLeft: 'auto',
    },
    product_SubBox: {
        '@media (min-width: 992px)': {
            width: '100%'
        }
    },
    product_txt: {
        float: 'left',
        fontSize: '27px',
        marginBottom: '10px',
    },
    product_gridBox: {
        border: '1px solid #e6e6e6',
        borderRadius: '6px'
    },
    product_gridTxt: {
        padding: '10px 16px 10px',
        backgroundColor: '#F9F9F8',
        fontSize: '18px',
        borderBottom: '1px solid #e6e6e6'
    },
    subGridBox: {
        // '@media (max-width: 992px)': {
        //     height: 'auto',
        //     overflow: 'hidden'
        // },
        border: "1px solid #e6e6e6",
        borderRadius: '6px'
    },

    card_img: {
        width: "100%",
        height: "100px",
        marginTop: "20px",
    },
    btnBox: {
        display: 'flex',
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#f8f8ff",
        marginTop: '10px'
    },
    product_list: {
        width: '100%',
        maxWidth: 360,
        bgcolor: 'background.paper'
    },

    itemCard: {
        border: '1px solid black',
        width: '100px',
    },
    itemCardbtn: {
        borderTop: "1px solid #e6e6e6",
        borderTopLeftRadius: "0px",
        borderTopRightRadius: "0px",
        borderBottomLeftRadius: "6px",
        borderBottomRightRadius: "6px",
        border: "none",
        // outline: "none",
        textTransform: "none",
        marginTop: "10px",
        "&:hover": {
            boxShadow: "none",
            backgroundColor: theme.palette.primary.main,
            border: "none",
            // outline: "none",
            color: "#fff",
        },
    },

    centerDiv: {
        backgroundColor: "rgba(255, 255, 255)",
        borderRadius: "16px",
        // boxShadow: "0px 0px 4px 0px rgba(0,0,0,0.5)",
        boxShadow: "0px 0px 12px 8px rgba( 255, 99, 71, 0.3)",
        padding: "32px",
        gap: "16px",
    },
    rightBtn: {
        marginTop: '2px',
        fontSize: "16px",
        color: "#fff",
        background: "#66B2FF",
        borderRadius: "0px",
        borderBottomRightRadius: "6px",
        boxShadow: "none",
        letterSpacing: "1px",
        textTransform: "none",
        "&:hover": {
            boxShadow: "none",
            background: "#66B2FF",
        },
    },
    leftBtn: {
        borderBottomRightRadius: "0px",
        borderBottomLeftRadius: "6px",
    },
    btnOutlinedPrimary: {
        fontSize: "16px",
        color: "#000",
        // background: "#fff",
        background: "	#f8f8ff",
        border: "1px solid #66B2FF ",
        borderRadius: "25px",
        boxShadow: "none",
        letterSpacing: "1px",
        textTransform: "none",
        "& .MuiSvgIcon-root": {
            fontSize: 30,
            marginLeft: 1,
            color: theme.palette.primary.main,
        },
        "&:hover": {
            boxShadow: "none",
            background: "#f8f8ff",
            border: "1px solid #66B2FF ",
        },
    },
    ErrorText: {
        marginLeft: "8px",
        fontSize: CONST.FONT_SIZE_12,
        color: theme.palette.error.main,
    },
    forgotPassLink: {
        marginTop: "-4px",
        fontSize: 16,
        cursor: "pointer",
        color: theme.palette.error.light,
        textDecoration: "underline",
    },

}))

export { useStyles };