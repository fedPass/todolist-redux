import List from './List';

function Lists({lists}) {
    return (
        <ul>
            {
                lists.map((list) => <List key={list.id} list={list} />)
            }
        </ul>
    )
}

export default Lists
