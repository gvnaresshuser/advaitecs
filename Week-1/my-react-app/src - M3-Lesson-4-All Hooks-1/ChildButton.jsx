import React from 'react';

//USING React.memo IMPROVES PERFORMANCE BY PREVENTING UNNECESSARY RE-RENDERS
export const ChildButton = React.memo(({ onClick }) => {
    console.log('ChildButton rendered');
    return (
        <button onClick={onClick} style={{ padding: '10px', marginTop: '10px' }}>
            Click Me
        </button>
    );
});

//UNNECESSARY RE-RENDERS OF CHILD COMPONENTS CAN BE AVOIDED USING REACT.MEMO
//REACT.MEMO WILL MEMOIZE THE COMPONENT AND WILL NOT RE-RENDER
/* export const ChildButton = ({ onClick }) => {
    console.log('ChildButton rendered');
    return (
        <button onClick={onClick} style={{ padding: '10px', marginTop: '10px' }}>
            Click Me
        </button>
    );
}; */