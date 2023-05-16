import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import "./timer.scss";

interface DialogProps {
  time?: string;
  dialogPara?: string;
  dialogOpen?: any;
}

const Timer = (props: DialogProps) => {
  const { time, dialogPara, dialogOpen } = props;

  const timerProps = {
    isPlaying: true,
    size: 120,
    strokeWidth: 6,
  };

  return (
    <>
      <Dialog open={dialogOpen} className='dialog_pop'>
        <div className="Dflex al-cnt js-cnt m-t-30 m-b-30">
          <CountdownCircleTimer
            {...timerProps}
            rotation='counterclockwise'
            duration={Number(time)}
            colors={"#3f51b5"}
          >
            {({ remainingTime }) => remainingTime}
          </CountdownCircleTimer>
        </div>
        <DialogContent>
          <DialogContentText>{dialogPara}</DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Timer;
