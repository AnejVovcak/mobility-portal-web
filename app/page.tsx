import {MontserratExtraBold, MontserratMedium, roboto} from "@/app/fonts";
import {NavBar} from "@/app/ui/NavBar";
import {HomePageGraphic} from "@/app/ui/HomePageGraphic";

export default async function Home() {

    return (
        <main className="flex min-h-screen flex-col">
            <NavBar/>
            <div className={"grid grid-cols-2 items-center gap-44 grid-flow-row px-64"}>
                <div className={`flex flex-col gap-7`}>
                    <div className={`${MontserratExtraBold.className} text-7xl text-blue`}>
                        Mobility Made Simple
                    </div>
                    <div className={`${MontserratMedium.className} text-dark-gray text-xl`}>
                        Mobility Portal simplifies legal complexities by presenting personalized and easy-to-use legal
                        information,
                        streamlining the entire cross-border process for employees and employers
                    </div>
                </div>
                <div className={`flex justify-center items-center w-[700px] h-[800px]`}>
                    <HomePageGraphic/>
                </div>
            </div>
        </main>
    );
}
