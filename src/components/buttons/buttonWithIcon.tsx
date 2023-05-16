import Button from "@mui/material/Button";
import "./button.scss";
export default function IconLabelButtons({
  text,
  onPress,
  type,
  ButtonIcon,
  className,
  disabled = false,
}: any) {
  return (
    <Button
      variant='outlined'
      type={type}
      className={`btn buttonWithIcon ${className}`}
      startIcon={ButtonIcon}
      onClick={onPress}
      disabled={disabled}
    >
      {text}
    </Button>
  );
}
