"use client";
import {Button, Label, TextInput} from "flowbite-react";
import DatePicker from "react-datepicker";
import {useState} from "react";
import "react-datepicker/dist/react-datepicker.css";

export function CreateEventPopUp() {
    const [EventDate, setEventDate] = useState(new Date())
    return (
        <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Event Details</h3>
            <div>
                <div className="mb-2 block rounded ">
                    <Label htmlFor="name" value="Name"/>
                </div>
                <TextInput id="name" name={'name'} required/>
            </div>
            <div>
                <div className="mb-2 block rounded ">
                    <Label htmlFor="description" value="Descripation"/>
                </div>
                <TextInput id="description" name={'description'} required/>
            </div>
            <div>
                <div className="mb-2 block rounded ">
                    <Label htmlFor="location" value="Location"/>
                </div>
                <TextInput id="location" name={'location'} required/>
            </div>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="date" className={'font-medium'} value="Date"/>
                </div>
                <DatePicker selected={EventDate} id={'date'} name={'date'} dateFormat="dd/MM/yyyy"  minDate={new Date()} onChange={(date) => {
                    setEventDate(date)
                }} required={true} />
                <div className="mb-2 block">
                    <Label htmlFor="time" className={'font-medium'}  value="Time"/>
                </div>
                <input aria-label="Time" name={'time'} id={'time'}  type="time" required={true}/>
            </div>

            <div className="w-full">
                <Button type={'submit'}>Create</Button>
            </div>
        </div>
    );
}
