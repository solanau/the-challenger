import Card from 'components/common/card';
import Text from 'components/common/text';
import { cn } from 'utils';

type TransactionCardProps = {
    width?: string;
    signature: string;
    amount: number;
    date: string;
    status: 'failed' | 'pending' | 'success';
};

const statuses = {
    failed: 'bg-red-500',
    pending: 'bg-yellow-500',
    success: 'bg-green-500',
};

const TransactionCard = ({
    signature,
    amount,
    date,
    status,
}: TransactionCardProps) => (
    <a
        href={`https://explorer.solana.com/tx/${signature}?cluster=devnet`}
        target="_blank"
        rel="noreferrer"
    >
        <Card className="flex flex-row items-center justify-between gap-3 !rounded-lg p-3 transition-all duration-300 hover:bg-opacity-[97%]">
            <div className="flex w-2/3 flex-row items-center gap-3">
                <Text
                    variant="sub-paragraph"
                    className="w-2/3 overflow-hidden text-ellipsis whitespace-nowrap text-base-content"
                >
                    {' '}
                    {signature}{' '}
                </Text>
                <Text variant="sub-paragraph" className="w-1/3 !text-primary">
                    {' '}
                    {amount}{' '}
                </Text>
            </div>
            <div className="flex w-1/3 flex-row items-center gap-3">
                <Text variant="label" className="w-1/2 text-secondary">
                    {' '}
                    {date}{' '}
                </Text>
                <div className="flex w-1/2 flex-row justify-center">
                    <div
                        className={cn(
                            'aspect-square h-2 rounded-full',
                            statuses[status],
                        )}
                    />
                </div>
            </div>
        </Card>
    </a>
);

export default TransactionCard;
