/*
  @file: Group.js
  @auther: ben kim
  @email: jaehwankim07120@gmail.com

  @note
  @todo
  @debug
*/
// Standard Import
import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { FormSelect } from 'shards-react';

// Standard Stylesheet
import 'shards-ui/dist/css/shards.min.css';

//Redux
import { connect } from 'react-redux';
import { updateDailyResult, updateDailyStatus, resetDailyDatas } from 'actions';

// Components
import CategoryButtons from 'components/Library/CategoryButtons/CategoryButtons';
import { getDailyData } from 'components/Library/utils';
import StatusBox from '../Components/StatusBox';

// View
import GroupDailyResult from './GroupDailyResult/GroupDailyResult';
import GroupMap from './GroupMap/GroupMap';

// Style Sheets
import './Group.scss';

const WeeklyResultData = {
    type: 'doughnut',
    datasets: [
        {
            borderWidth: 0,
            data: [1, 1, 1],
            backgroundColor: ['#7ed321', '#ff7700', '#ff0000'],
        },
    ],

    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels: ['Optmal', 'Safie', 'Warning'],
};

const MonthlyResultData = {
    type: 'doughnut',
    datasets: [
        {
            borderWidth: 0,
            data: [1, 1, 1],
            backgroundColor: ['#7ed321', '#ff7700', '#ff0000'],
        },
    ],

    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels: ['Optmal', 'Safie', 'Warning'],
};

const buttonStats = [
    {
        label: 'Daily Results',
        link: 'DailyResult',
    },
    {
        label: 'Map',
        link: 'Map',
    },
];

class ReportGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: 0,
            selectedGroup: 0,

            DailyResultData: undefined,
            DailyResultStatus: undefined,
            UserInfo: undefined,

            isLoaded: false,
        };

        this.onUpdateDailyResult = this.props._onUpdateDailyResult.bind(this);
        this.onUpdateDailyStatus = this.props._onUpdateDailyStatus.bind(this);
        this.getDailyData = getDailyData.bind(this);

        this.onClickCategoryButtons = this.onClickCategoryButtons.bind(this);
        this.onChangeGroupForm = this.onChangeGroupForm.bind(this);

        this.selectGroupForm = this.selectGroupForm.bind(this);
        this.getGroupData = this.getGroupData.bind(this);
    }

    componentDidMount() {
        this.getDailyData();

        /*
    setInterval(async () =>{
      this.getDailyData();
    }, 3000);
    */
    }

    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }

    onClickCategoryButtons(value) {
        this.setState({
            selected: value,
        });

        this.getGroupData = this.getGroupData.bind(this);
    }

    onChangeGroupForm(event) {
        this.setState({ selectedGroup: event.target.value });
        this.props.history.push(
            `${this.props.history.location.pathname}?${event.target.value}`,
        );

        console.log(this.props.history);
    }

    selectGroupForm() {
        const GroupDatas = this.props._DailyResultData.datasets;

        return (
            <FormSelect
                onChange={this.onChangeGroupForm}
                className="group-select-form"
            >
                {GroupDatas.map((data, index) => (
                    <option key={index} value={index}>
                        {data.label}
                    </option>
                ))}
            </FormSelect>
        );
    }

    getGroupData(index) {
        const selectedGroupDatasets = [
            this.props._DailyResultData.datasets[index],
        ];

        const selectedGroupLabels = this.props._DailyResultData.labels;

        const DailyResultData = {
            type: 'bar',
            labels: selectedGroupLabels,
            datasets: selectedGroupDatasets,
        };

        return DailyResultData;
    }

    render() {
        const isLoaded = this.state.isLoaded;

        if (isLoaded === false) {
            return null; // note you can also return null here to render nothingNoEventsView />;
        } else {
            const selectedGroup = this.state.selectedGroup;
            const UserInfo = this.state.UserInfo;

            return (
                <div className="group-section">
                    <div className="group-inner">
                        {/* Top Container */}
                        <div className="group-top-container">
                            <StatusBox
                                DailyResultStatus={
                                    this.props._DailyResultStatus
                                }
                                UserInfo={UserInfo}
                            />
                        </div>

                        {/* Bottom Container */}
                        <div className="group-bottom-container">
                            {/* Category Button Box */}
                            <div className="button-box">
                                <CategoryButtons
                                    buttonStats={buttonStats}
                                    currentPath={`/Report/Group`}
                                    selected={this.state.selected}
                                    clickHandler={this.onClickCategoryButtons}
                                />
                            </div>

                            {/* Group Select Form */}
                            <div className="group-select-box">
                                {this.selectGroupForm()}
                            </div>

                            <Switch>
                                {/* Router */}
                                <Route
                                    exact
                                    path="/Report/Group"
                                    render={() => (
                                        <Redirect to="/Report/Group/DailyResult" />
                                    )}
                                />

                                <Route
                                    path={`/Report/Group/DailyResult`}
                                    render={props => (
                                        <GroupDailyResult
                                            DailyResultData={this.getGroupData(
                                                selectedGroup,
                                            )}
                                            WeeklyResultData={WeeklyResultData}
                                            MonthlyResultData={
                                                MonthlyResultData
                                            }
                                        />
                                    )}
                                />

                                <Route
                                    path={`/Report/Group/Map`}
                                    render={props => (
                                        <GroupMap
                                            GroupResultData={MonthlyResultData}
                                            DeviceResultData={WeeklyResultData}
                                        />
                                    )}
                                />
                            </Switch>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

let mapStateToProps = state => {
    return {
        _DailyResultData: state.dailyDataUpdater.DailyResultData,
        _DailyResultStatus: state.dailyDataUpdater.DailyResultStatus,
    };
};

let mapDispatchToProps = dispatch => {
    return {
        _onUpdateDailyResult: dailyResult =>
            dispatch(updateDailyResult(dailyResult)),
        _onUpdateDailyStatus: dailyStatus =>
            dispatch(updateDailyStatus(dailyStatus)),
        _resetAllDate: () => dispatch(resetDailyDatas()),
    };
};

ReportGroup = connect(
    mapStateToProps,
    mapDispatchToProps,
)(ReportGroup);

export default ReportGroup;
