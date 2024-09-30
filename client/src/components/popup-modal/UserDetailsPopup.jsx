"use client";
import {Button, Label, TextInput} from "flowbite-react";
import {useState} from "react";

// eslint-disable-next-line react/prop-types
export function UserDetailsPopup({name}) {
    const [Name, setName] = useState(name)
    const handleChange = (event) => {
        setName(event.target.value);
    };
    return (

        <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Your Details</h3>
            <div>
                <div className="mb-2 block rounded ">
                    <Label htmlFor="name" value="Your Name"/>
                </div>
                <TextInput id="name" name={'name'} value={Name} onChange={handleChange} required/>
            </div>

            <div>
                <div className="mb-2 block rounded ">
                    <Label htmlFor="collageid" value="Your Collage Id"/>
                </div>
                <TextInput id="collageid" placeholder={'i.e 22ceueg082'} name={'collageid'} required/>
            </div>

            <label htmlFor={"branch"}/>
            <select name={"branch"} id={"branch"}>
                <option value={"none"}>Select Branch</option>
                <option value={"CE"}>CE</option>
                <option value={"IT"}>IT</option>
                <option value={"EC"}>IT</option>
                <option value={"MH"}>MH</option>
                <option value={"CH"}>CH</option>
                <option value={"IC"}>IC</option>
                <option value={"BCA"}>BCA</option>
                <option value={"MCA"}>MCA</option>
                <option value={"MBA"}>MBA</option>
                <option value={"BBA"}>BBA</option>
            </select>

            {/*<div className="flex justify-between">*/}
            {/*    <div className="flex items-center gap-2">*/}
            {/*        <Checkbox id="remember"/>*/}
            {/*        <Label htmlFor="remember">Remember me</Label>*/}
            {/*    </div>*/}
            {/*    <a href="#" className="text-sm text-cyan-700 hover:underline dark:text-cyan-500">*/}
            {/*        Lost Password?*/}
            {/*    </a>*/}
            {/*</div>*/}
            <div className="w-full">
                <Button type={'submit'}>Update Details</Button>
            </div>
        </div>
    );
}
