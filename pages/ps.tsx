import { GetStaticProps } from "next";
import Head from "next/head";
import { useState } from "react";
import Menu from "../Components/Menu";
import { useSession } from "next-auth/react";
import Link from "next/link";

type CGPA = {
    [key: string]: number
}

type PS_Station = {
    name: string
    last_paid_stipend: number
    min_cgpa: CGPA
    max_cgpa: CGPA
}

const sample: PS_Station[] = [
    {
        name: 'Google',
        last_paid_stipend: 100000,
        min_cgpa: {
            '2021 Sem 1': 9,
        },
        max_cgpa: {
            '2021 Sem 1': 10,
        },
    }
]


export default function PS() {
    const [search, setSearch] = useState("");
    const [cgpa, setCGPA] = useState(0);
    const [yearRef, setYearRef] = useState("2021 Sem 1");
    const yearReferences = ['2018 Sem 1', '2018 Sem 2', '2019 Sem 1', '2019 Sem 2', '2020 Sem 1', '2020 Sem 2', '2021 Sem 1', '2021 Sem 2', '2022 Sem 1', '2022 Sem 2', '2023 Sem 1', '2023 Sem 2']

    const { data: session } = useSession()

    return (
        <>
            <Head>
                <title>Practice School.</title>
                <meta name="description" content="A website containing all bits pilani hyderabad campus handouts" />
                <meta name="keywords" content="BITS Pilani, Handouts, BPHC, Hyderabad Campus, BITS Hyderabad, BITS, Pilani, Handouts for you, handouts, for, you, bits, birla, institute, bits hyd, academics" />
                <meta name="robots" content="index, follow" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            {/* Search box */}
            <div className="grid place-items-center">
                <div className="w-[70vw] place-items-center flex flex-col justify-between">
                    <h1 className="text-6xl pt-[50px] pb-[20px] px-[35px] text-primary">Practice School.</h1>

                    <Menu current={"ps"} />

                    {session && <>
                        <input
                            type="text"
                            placeholder="Search for Company..."
                            className="input input-bordered w-full max-w-xs m-3"
                            onChange={(e) => setSearch(e.target.value)}
                        />

                        OR

                        <input
                            type="text"
                            placeholder="Enter your CGPA..."
                            className="input input-bordered w-full max-w-xs m-3"
                            onChange={(e) => setCGPA(parseFloat(e.target.value))}
                        />

                        <select className="select select-bordered w-full max-w-xs" onChange={(e) => setYearRef(e.target.value)}>
                            <option disabled selected>Which year to use as reference?</option>
                            {
                                yearReferences.map((year) => (
                                    <option value={year} key={year}>{year}</option>
                                ))
                            }
                        </select>

                        <Link className="m-3" href={"/pschron"}>
                            <button className="btn btn-outline w-full">
                                Are you looking for chronicles?
                            </button>
                        </Link>
                    </>}
                </div>
            </div>

            {session &&
                <div>
                    <h1 className="text-3xl text-center my-3">PS Details</h1>
                    <div className='px-2 md:px-20'>
                        {
                            sample
                                .filter((d: PS_Station) => d.name.toLowerCase().includes(search.toLowerCase()))
                                .map((station) => (
                                    <div className="py-1 m-2 border-solid border-[1px] border-white rounded-xl" key={station.name}>
                                        <div className="alert shadow-sm">
                                            <div>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                                <span>{station.name.toUpperCase()}</span>
                                            </div>
                                            <div className="flex-none">
                                                <button className="btn btn-sm btn-primary">Stipend: {station.last_paid_stipend}</button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                        }
                    </div>
                </div>}

        </>
    );
}
