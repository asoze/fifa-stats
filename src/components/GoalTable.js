import React from 'react';
import { fetches } from '../data/fetches';

class GoalTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            goals: []
        }
    }

    componentDidMount() {
        this.initializeGoals();
    }

    initializeGoals() {
        const teams = fetches.getTeams();
        const goals = fetches.getGoals();
        const people = fetches.getPersons();

        Promise.all( [goals, teams, people] )
            .then( (values) => {

                const goals = values[0].data;
                const teams = values[1].data;
                const people = values[2].data;

                const fullGoals = goals.map( (eachGoal) => {
                    eachGoal.person = people[ eachGoal.person_id-1 ];
                    eachGoal.team = teams[ eachGoal.team_id-1 ];

                    return eachGoal;
                });

                this.setState({
                    goals: fullGoals
                });
            });
    }

    render() {
        const goalRows = this.state.goals.map( (goal, idx) => {
            const goalTime = goal.minute;
            const over = goalTime - 90;
            console.log("GOAL AND OVER", goalTime, over );
            const actualTime = (over < 0) ? goalTime : `90 + ${over}`;
            return (
                <tr key={idx}>
                    <td>{ goal.team.title }</td>
                    <td>{ goal.person.name }</td>
                    <td>{`${actualTime}'`}</td>
                </tr>
            );
        });

        return (
            <table>
                <thead>
                    <tr>
                        <th>Team ID</th>
                        <th>Person</th>
                        <th>At Minute</th>
                    </tr>
                </thead>
                <tbody>
                    { goalRows }
                </tbody>
            </table>
        );
    }
}

export default GoalTable;
