import './card.css'
function Card(props){
    const classes='card card_box '+props.className;
    return <div className={classes}>{props.children}</div>
};
export default Card;