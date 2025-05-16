

// import ReferAFriend from './components/ReferAFriend';
import ReferAFriend from "@/components/frientRefral";

export default function ReferFriendPage() {
    return (
        <main>
            <div className="p-3 lg:p-20 bg-slate-50 min-h-screen lg:text-sm   text-gray-700 space-y-3">

                <h2 className="text-lg font-semibold ">Refer a friend</h2>
                <ReferAFriend />
            </div>
        </main>
    );
}
