import Button from "@mui/material/Button";
import "./button.scss";

export default function NormalButton({
  type = "button",
  variant = "contained",
  buttonText = "",
  className,
  disabled = false,
  onPress = () => {},
}: any) {
  return (
    <Button
      type={type}
      variant={variant}
      disabled={disabled}
      //onClick={() => Navigate("/dashboard")}
      className={`btn ${className}`}
      //className={className}
      onClick={onPress}
    >
      {buttonText}
    </Button>
  );
}
