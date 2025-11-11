import { Chama } from '@/src/generated/prisma/client'

const ChamasTable = ({ chamas }: { chamas: Chama[] }) => {
    return (
        <div className="border rounded-md">
            <div className="grid grid-cols-4 gap-2 text-sm py-3 px-4">
                <div>Name</div>
                <div>Location</div>
                <div>Minimum Savings</div>
                <div>Registration ID</div>
            </div>
            {chamas.map((chama) => (
                <div
                    key={chama.id}
                    className="grid grid-cols-4 gap-2 border-t py-3 px-4"
                >
                    <div>{chama.name}</div>
                    <div>{chama.location}</div>
                    <div>{chama.minimumSavings}</div>
                    <div>{chama.registrationId ?? 'Not Registered'}</div>
                </div>
            ))}
        </div>
    )
}

export default ChamasTable
