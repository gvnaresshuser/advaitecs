import React from "react";
import "./styles-test.css";
import styles from "./StylingCard.module.css"; //NAMING IMPORTANT
import styled from "styled-components"; // npm install styled-components - from root project folder

import "./StylingCard.css";
//------------------- styled-components ----------------------'' "" `` below esc button ~~ ``
const Heading = styled.h1`
  color: red;
  font-size: 30px;
  text-align: center;
`;

const Button = styled.button`
  background-color: teal;
  padding: 10px 20px;
  border: none;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: magenta;
  }
`;

const Button1 = styled.button`
  background-color: ${(props) => (props.$primary ? "blue" : "gray")};
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const Button2 = styled.button`
  background-color: ${(props) => (props.$primary ? "red" : "green")};
  color: white;
  padding: ${(props) => (props.size === "large" ? "10px 50px" : "50px 10px")};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background-color: ${(props) => (props.$primary ? "magenta" : "lime")};
  }
`;

//-------------------------- BaseButton + Variants ------------------------------
const BaseButton = ({ className, children }) => (
  <button className={className}>{children}</button>
);
/* const BaseButton = ({  children }) => (
  <button>{children}</button>
); */

const StyledBaseButton = styled(BaseButton)`
  background: linear-gradient(135deg, #ff7e5f, #feb47b);
  color: white;
  padding: 12px 28px;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease-in-out;

  &:hover {
    background: linear-gradient(135deg, #ff6a3d, #ff9966);
    box-shadow: 0px 6px 14px rgba(0, 0, 0, 0.2);
    transform: translateY(-2px);
  }

  &:active {
    background: linear-gradient(135deg, #e65c2c, #ff8050);
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.15);
    transform: translateY(1px);
  }
`;

const SecondaryBaseButton = styled(BaseButton)`
  background-color: #4caf50;
  color: white;
  border-radius: 8px;
  padding: 10px 20px;

  &:hover {
    background-color: #45a049;
  }
`;
const BaseButtonNew = ({ children }) => (
  <button className="styled-button">{children}</button>
);
//-------------------------- End ------------------------------

const StylingCard = () => {
  const headingStyle = {
    color: "blue",
    fontSize: "24px",
    textAlign: "center",
  };

  const handleClick = (e) => {
    alert(`Button Name: ${e.target.name}`);
  };

  return (
    <div>
      <h1 className="gradient-heading">Styling in React JS - index.css</h1>
      {/* a) Inline Styling */}
      <h1 style={{ color: "orange", fontSize: "24px", textAlign: "center" }}>
        1.Inline Styling in React - camel case - not snake case
      </h1>
      <h1 style={headingStyle}>1.Inline Styling in React</h1>
      <hr />
      {/* b) CSS Classes */}
      <div>
        <h1 className="main-heading">2.CSS Styling in React</h1>
        <button className="buttonCls">Hover Me</button>
      </div>
      <hr />
      {/* c) CSS Modules */}
      <div>
        <h1 className={styles.heading}>3.CSS Modules in React</h1>
        <button className={styles.button}>Styled Button</button>
      </div>
      <hr />
      {/* d) Styled Components */}
      <div>
        <Heading>4.Styled Components in React - External Component</Heading>
        <Button>Click Me</Button>&nbsp;
        <Button1>Button 1</Button1>&nbsp;
        <Button1 $primary>Button 1</Button1>&nbsp;
        {/* <Button2 name="saveBtn" $primary={false} size="large" onClick={handleClick}>Submit</Button2> */}
        {/* <Button2
          name="saveBtn"
          $primary={false}
          size="large"
          onClick={handleClick}
        >
          Submit
        </Button2> */}
        <Button2 name="saveBtn" $primary size="large" onClick={handleClick}>
          Save
        </Button2>
        &nbsp;
        <Button2 name="cancelBtn" size="small" onClick={handleClick}>
          Cancel
        </Button2>
      </div>
      <br />
      <hr />
      <Heading>5.Style Custom Components in React</Heading>
      <StyledBaseButton>Style Custom Components</StyledBaseButton>&nbsp;
      <SecondaryBaseButton>Style Custom Components</SecondaryBaseButton>&nbsp;
      <BaseButtonNew>Style Custom Components</BaseButtonNew>
    </div>
  );
};

export default StylingCard;
/*
| JSX                            | `props.$primary` | Result       |
| ------------------------------ | ---------------- | ------------ |
| `<Button1 />`                  | `undefined`      | False branch |
| `<Button1 $primary />`         | `true`           | True branch  |
| `<Button1 $primary={true} />`  | `true`           | True branch  |
| `<Button1 $primary={false} />` | `false`          | False branch |

*/
/*
CSS Padding Shorthand Rules

padding: 20px;

Top = 20px
Right = 20px
Bottom = 20px
Left = 20px

padding: 10px 30px;

Top = 10px
Bottom = 10px
Left = 30px
Right = 30px

padding: 10px 20px 30px;

Top = 10px
Left = Right = 20px
Bottom = 30px

padding: 10px 20px 30px 40px;

Top = 10px
Right = 20px
Bottom = 30px
Left = 40px

Memory Trick

1 value → All sides
2 values → Top/Bottom | Left/Right
3 values → Top | Left/Right | Bottom
4 values → Top | Right | Bottom | Left (clockwise)
*/
/*
& is called the Parent Selector.
:hover is called a Pseudo-class.
This technique is called Selector Nesting.
*/
