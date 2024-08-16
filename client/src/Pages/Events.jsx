import {Tabs} from "flowbite-react";
import { MdEventAvailable } from "react-icons/md";
import { FaHistory } from "react-icons/fa";

const Events = () => {
    return (
        <>
            <Tabs aria-label="Tabs with underline" style="underline">
                <Tabs.Item active title="Events" icon={MdEventAvailable}>

                </Tabs.Item>
                <Tabs.Item title="History" icon={FaHistory}>

                </Tabs.Item>
            </Tabs>
        </>
    )
}

export default Events;