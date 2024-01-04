import "./ProgressBar.css";
const ProgressBar = (props) => {

  let width =
  props.target === 0 ? 0 : parseInt((props.progress * 100) / props.target);
  
  return (
    <div className="progress__bar">
      <div className="progress__actual_progress"> {width}%</div>
      <div className="progress__bar--complete">
        <div
          style={{ width: `${width}%` }}
          className="progress__bar--actual"></div>
      </div>
    </div>
  );
};

export default ProgressBar;
