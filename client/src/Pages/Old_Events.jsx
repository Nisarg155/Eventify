"use client";

import {Button, Card} from "flowbite-react";
import {useSelector} from "react-redux";
import {MagnifyingGlass} from "react-loader-spinner";
import {useNavigate} from "react-router-dom";

const Old_Events = (props) => {
    // eslint-disable-next-line react/prop-types
    const events = props.oldEvents;
    const user = useSelector(state => state.user)
    const access_level = user.access_level
    const navigation = useNavigate();


    return (

        // eslint-disable-next-line react/prop-types
        !props.loader ?
            <div className={'p-6 flex-wrap flex justify-start align-items-stretch  gap-4'}>
                {
                    // eslint-disable-next-line react/prop-types
                    events.map((event, index) => (
                        <Card className="max-w-sm shadow-md shadow-cyan-700  w-full sm:mb-2 mb-3 "
                              style={{borderRadius: '15px'}} key={index}>

                            <h5 className="text-2xl font-bold tracking-tight text-cyan-600 dark:text-white">
                                {
                                    event.name
                                }
                            </h5>
                            <p className="font-normal text-gray-700 dark:text-gray-400">
                                {
                                    event.description
                                }
                            </p>
                            {
                                (access_level === 'Administrator' || access_level === 'Member') ?
                                    <div className="flex flex-wrap justify-end">
                                        <Button style={{borderRadius: '10px'}} className={'shadow'} onClick={() => {
                                            navigation(`/eventDetails/${event._id}/${event.date.slice(0, 10)}`)
                                        }}>
                                            Details
                                        </Button>
                                    </div> : null
                            }


                        </Card>
                    ))
                }
            </div> : <div className={'flex flex-col -mt-40 justify-center items-center h-screen '}>
                <MagnifyingGlass
                    visible={true}
                    height="150"
                    width="150"
                    ariaLabel="magnifying-glass-loading"
                    wrapperStyle={{}}
                    wrapperClass="magnifying-glass-wrapper"
                    glassColor="#c0efff"
                    color="#e15b64"
                />
            </div>
    )
}

export default Old_Events;

