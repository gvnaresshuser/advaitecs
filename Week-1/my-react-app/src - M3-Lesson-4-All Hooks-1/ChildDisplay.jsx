import React,{memo} from 'react';

//WITH REACT.MEMO CHILD COMPONENT GETS RENDERED ONLY WHEN PROPS CHANGE
export const ChildDisplay = memo(({ name }) => {
//export const ChildDisplay = React.memo(({ name }) => {
    console.log('👶 ChildDisplay rendered');
    return <h3>Hello, {name}</h3>;
});

//WITHOUT REACT.MEMO CHILD COMPONENT GETS RENDERED EVERY TIME PARENT RERENDERS
/* export const ChildDisplay = ({ name }) => {
    console.log('👶 ChildDisplay rendered');
    return <h3>Hello, {name}</h3>;
}; */