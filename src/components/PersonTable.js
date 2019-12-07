import React from 'react';
import { fetches } from '../data/fetches';

class PersonTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            people: []
        }
    }

    componentDidMount() {
        this.initializePeople();
    }

    initializePeople() {
        fetches.getPersons()
            .then( (person) => {
                this.setState({
                    people: person.data
                });
            }
        );
    }

    render() {
        const peopleRows = this.state.people.map( (person, idx) => {
            return (
                <tr key={idx}>
                    <td>{ person.id }</td>
                    <td>{ person.name }</td>
                </tr>
            );
        });

        return (
            <table className='personTable'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    { peopleRows }
                </tbody>
            </table>
        );
    }
}

export default PersonTable;
