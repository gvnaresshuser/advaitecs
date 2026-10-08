import React from 'react';

function ListItem({ item }) {
    return <li style={{ color: item.id % 2 === 0 ? 'green' : 'red' }}>{item.name}</li>;
}
function ListItemCSSClass({ item }) {
    return <li
        key={item.id}
        className={item.id % 2 === 0 ? 'even-item' : 'odd-item'}
    >
        {item.name}
    </li>;
}

function MyListComponent2({ items }) {
   /*  return (
        <ul>
            {items.map(item => (
                <ListItem key={item.id} item={item} />
            ))}
        </ul>
    ); */
    return (
        <ul>
            {items.map(item => (
                <ListItemCSSClass key={item.id} item={item} />
            ))}
        </ul>
    );
}
export { MyListComponent2 };