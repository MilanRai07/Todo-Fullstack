import ProfileEdit from "./ProfileEdit";
import ProfileInfo from "./ProfileInfo";
import { useState } from "react";

const ProfileIndex = () => {
    const [showEdit, setShowEdit] = useState(false);
    return (
        <main className='p-7 '>
            <div className="cardBox">
                {
                    showEdit ? (
                        <ProfileEdit setShowEdit={setShowEdit} />
                    ) : (
                        <ProfileInfo setShowEdit={setShowEdit} />
                    )
                }
            </div>
        </main>
    )
}

export default ProfileIndex
