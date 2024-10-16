import {PieChart} from "@mui/x-charts/PieChart";
import {useEffect, useState} from "react";
import {FcPieChart} from "react-icons/fc";
import NumberTicker from "../components/ui/number-ticker.jsx";
import emptylist from '../assets/No-Search-Results-Found--Streamline-Bruxelles.png'


const Insights = (props) => {

    // eslint-disable-next-line react/prop-types
    const users = props.Users;
    const [accepted, setAccepted] = useState(0)
    const registeredMap = new Map()
    const acceptedMap = new Map()
    const [seriesDatas, setSeriesDatas] = useState({})
    const [registeredPie, setRegisteredPie] = useState([]);
    const [acceptedPie, setAcceptedPie] = useState([])

    const get_count = (data) => {
        let temp = 0;
        data.forEach((item) => {
            temp += item.value;
        })
        return temp;
    }

    const get_acc_branch_reg = (branch) => {
        const temp = new Map();
        // eslint-disable-next-line react/prop-types
        users.forEach((user) => {
            if (user.branch === branch) {
                if (temp.has('Sem '  + user.sem.toString())) {
                    temp.set('Sem '  + user.sem.toString(),temp.get('Sem '  + user.sem.toString()) + 1);
                } else {

                    temp.set('Sem '  + user.sem.toString(), 1);
                }
            }
        })

        return Array.from(temp, ([label, value], id) => ({
            id, value, label,
        }))
    }
    const get_acc_branch_acc = (branch) => {
        const temp = new Map();
        // eslint-disable-next-line react/prop-types
        users.forEach((user) => {
            if (user.branch === branch && user.attended) {
                if (temp.has('Sem '  + user.sem.toString())) {
                    temp.set('Sem ' + user.sem.toString(),temp.get('Sem ' + user.sem.toString()) + 1);
                } else {
                    temp.set('Sem '  + user.sem.toString(), 1);
                }
            }
        })
        return Array.from(temp, ([label, value], id) => ({
            id, value, label,
        }))

    }
    useEffect(() => {
        const branchSet = new Set();
        let temp = 0 ;
        // eslint-disable-next-line react/prop-types
        if (users.length > 0) {

            // eslint-disable-next-line react/prop-types
            users.forEach((user) => {
                branchSet.add(user.branch)
                if (registeredMap.has(user.branch)) {
                    registeredMap.set(user.branch, registeredMap.get(user.branch) + 1);
                } else {
                    registeredMap.set(user.branch, 1);
                }
                if (user.attended) {
                    if (acceptedMap.has(user.branch)) {
                        temp++;
                        acceptedMap.set(user.branch, acceptedMap.get(user.branch) + 1);
                    } else {
                        temp++;
                        acceptedMap.set(user.branch, 1);
                    }
                }
            })
            setAccepted(temp)
            const seriesData = Array.from(registeredMap, ([label, value], id) => ({
                id, value, label,
            }));
            const seriesData2 = Array.from(acceptedMap, ([label, value], id) => ({
                id, value, label,
            }));
            setRegisteredPie(seriesData);
            setAcceptedPie(seriesData2);
            const data = {};
            branchSet.forEach((branch) => {
                const temp = [];
                temp.push(get_acc_branch_reg(branch));
                temp.push(get_acc_branch_acc(branch));
                data[branch] = temp;
            })
            console.log(data)
            setSeriesDatas(data)

        }

    }, [users]);

    return (<>
            <div className={'flex flex-wrap  p-4  justify-evenly align-items-center'}>
                {registeredPie.length > 0 ? <div className={'flex flex-col justify-center items-center h-full'}>
                    <PieChart
                        series={[{
                            data: registeredPie,
                            innerRadius: 30,
                            outerRadius: 100,
                            paddingAngle: 5,
                            cornerRadius: 5,
                            startAngle: -45,
                            endAngle: 225,
                            cx: 150,
                            cy: 150,
                        },]}

                        width={400}
                        height={300}
                    />
                    <div>
                        <div className="mt-4 gap-2 flex-wrap flex">
                            <FcPieChart className={'h-7 w-7'}/>
                            <h3 className="text-lg font-bold">Registered Users by Branch</h3>
                        </div>
                        {/* eslint-disable-next-line react/prop-types */}
                        <div className="mt-.5 gap-2 flex-wrap flex">
                            <FcPieChart className={'h-7 w-7'}/>
                            {/* eslint-disable-next-line react/prop-types */}
                            <b>Total Registrations</b> :- <NumberTicker value={Number(users.length) || 0}/>
                        </div>
                    </div>
                </div> : <div>
                    <div>
                        <img src={emptylist} width={250} alt={'Empty Box'}/>
                    </div>
                    <div><p><b>No Registered User</b></p></div>
                </div>}
                {acceptedPie.length > 0 ? <div className={'flex flex-col justify-center items-center h-full'}>
                    <PieChart
                        series={[{
                            data: acceptedPie,
                            innerRadius: 30,
                            outerRadius: 100,
                            paddingAngle: 5,
                            cornerRadius: 5,
                            startAngle: -45,
                            endAngle: 225,
                            cx: 150,
                            cy: 150,
                        },]}
                        width={400}
                        height={300}
                    />
                    <div>
                        <div className="mt-4 gap-2 flex-wrap flex">
                            <FcPieChart className={'h-7 w-7'}/>
                            <h3 className="text-lg font-bold">Checked-in  Users by Branch</h3>
                        </div>
                        {/* eslint-disable-next-line react/prop-types */}
                        <div className="mt-.5 gap-2 flex-wrap flex">
                            <FcPieChart className={'h-7 w-7'}/>
                            {/* eslint-disable-next-line react/prop-types */}
                            <b>Total Check-ins</b> :- <NumberTicker value={Number(accepted) || 0}/>
                        </div>
                    </div>
                </div> : <div>
                    <div>
                        <img src={emptylist} width={250} alt={'Empty Box'}/>
                    </div>
                    <div><p><b>No Accepted User</b></p></div>
                </div>}

            </div>

        {
            seriesDatas ? Object.entries(seriesDatas).map( ([key,value],index) => (
                <div className={'flex flex-wrap  p-4  justify-evenly align-items-center'} key={index}>
                    {value[0].length > 0 ? <div className={'flex flex-col justify-center items-center h-full'}>
                        <PieChart
                            series={[{
                                data: value[0],
                                innerRadius: 30,
                                outerRadius: 100,
                                paddingAngle: 5,
                                cornerRadius: 5,
                                startAngle: -45,
                                endAngle: 225,
                                cx: 150,
                                cy: 150,
                            },]}
                            width={400}
                            height={300}
                        />
                        <div>
                            <div className="mt-4 gap-2 flex-wrap flex">
                                <FcPieChart className={'h-7 w-7'}/>
                                <h3 className="text-lg font-bold">Registered Users of Branch  {key} </h3>
                            </div>
                            {/* eslint-disable-next-line react/prop-types */}
                            <div className="mt-.5 gap-2 flex-wrap flex">
                                <FcPieChart className={'h-7 w-7'}/>
                                {/* eslint-disable-next-line react/prop-types */}
                                <b>Total Registrations</b> :- <NumberTicker value={get_count(value[0]) || 0}/>
                            </div>
                        </div>
                    </div> : <div>
                        <div>
                            <img src={emptylist} width={250} alt={'Empty Box'}/>
                        </div>
                        <div><p><b>No Registered User of Branch {key}</b></p></div>
                    </div>}

                    {value[1].length > 0 ? <div className={'flex flex-col justify-center items-center h-full'}>
                        <PieChart
                            series={[{
                                data: value[1],
                                innerRadius: 30,
                                outerRadius: 100,
                                paddingAngle: 5,
                                cornerRadius: 5,
                                startAngle: -45,
                                endAngle: 225,
                                cx: 150,
                                cy: 150,
                            },]}
                            width={400}
                            height={300}
                        />
                        <div>
                            <div className="mt-4 gap-2 flex-wrap flex">
                                <FcPieChart className={'h-7 w-7'}/>
                                <h3 className="text-lg font-bold">Checked-in  Users of Branch {key}</h3>
                            </div>
                            {/* eslint-disable-next-line react/prop-types */}
                            <div className="mt-.5 gap-2 flex-wrap flex">
                                <FcPieChart className={'h-7 w-7'}/>
                                {/* eslint-disable-next-line react/prop-types */}
                                <b>Total Check-ins</b> :- <NumberTicker value={get_count(value[1]) || 0}/>
                            </div>
                        </div>
                    </div> : <div>
                        <div>
                            <img src={emptylist} width={250} alt={'Empty Box'}/>
                        </div>
                        <div><p><b>No Accepted User for Branch {key}</b></p></div>
                    </div>}

                </div>
            )) : null
        }

    </>)


}

export default Insights