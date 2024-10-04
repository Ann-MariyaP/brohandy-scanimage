import React, { useState } from "react";
import "./input_field.scss";
import { PiEyeSlash, PiEyeLight } from "react-icons/pi";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

function InputPassword({
  className,
  value,
  onChange,
  onClick,
  rule,
  minLength,
  onBlur,
  onKeyDown,
  align,
  controls,
  disabled,
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <Form.Group>
        <Form.Label className="input_pwdlabel">Password*</Form.Label>
        <InputGroup>
          <Form.Control
            className="input_pswd"
            type={showPassword ? "text" : "password"}
            name="password"
            value={value}
            onChange={onChange}
            placeholder="Enter your password"
            aria-label="password"
            aria-describedby="password-input"
            required
          />
          <InputGroup.Text
            onClick={() => setShowPassword(!showPassword)}
            className="pwd_icon_part"
          >
            {showPassword ? (
              <PiEyeSlash className="eye_icon" />
            ) : (
              <PiEyeLight className="eye_icon" />
            )}
          </InputGroup.Text>
        </InputGroup>
      </Form.Group>

      {/* <div>
        <Input
          bordered={false}
          onClick={onClick}
          onChange={onChange}
          value={value}
          rule={rule}
          align={align}
          controls={controls}
          minLength={minLength}
          onBlur={onBlur}
          onKeyDown={onKeyDown}
          disabled={disabled}
          style={{ backgroundColor: "#f4f4f7" }}
          className={`input_type_style w-100  pb-2 ${className}`}
          type="text"
        />
      </div> */}
    </div>
  );
}

export default InputPassword;
