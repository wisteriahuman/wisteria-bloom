import "@/app/globals.css";
import Spinner from '@/components/spinner/Spinner';


export default function Loading() {
    return (
        <div className="justify-center items-center flex h-screen">
            <Spinner />
            <h1>Loading...</h1>
        </div>
    );
}