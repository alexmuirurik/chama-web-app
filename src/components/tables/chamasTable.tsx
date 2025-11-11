import { Chama } from '@/src/generated/prisma/client'

const ChamasTable = ({ chamas }: { chamas: Chama[] }) => {
    return (
        <div className="space-y-4 border rounded-md p-2">
            <div className="flex items-center justify-between text-sm p-2">
                <div>Name</div>
                <div>Location</div>
                <div>Minimum Savings</div>
                <div>Registration ID</div>
            </div>
            {chamas.map((chama) => (
                <div
                    key={chama.id}
                    className="flex items-center justify-between p-2"
                >
                    <div>{chama.name}</div>
                    <div>{chama.location}</div>
                    <div>{chama.minimumSavings}</div>
                    <div>{chama.registrationId}</div>
                </div>
            ))}
        </div>
    )
}

export default ChamasTable
