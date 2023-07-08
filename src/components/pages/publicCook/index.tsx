import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';
import { type ReactElement } from 'react';
import { type CookRank, type CurrencyCode } from '../../../data-source/generated/graphql';
import { type Category } from '../../../shared/Category';
import { type Kitchen } from '../../../shared/Kitchen';
import { type Language } from '../../../shared/Language';
import { type Location } from '../../../shared/Location';
import { type SignedInUser } from '../../../shared/SignedInUser';
import PEMenuCard from '../../cards/menuCard/PEMenuCard';
import PEFooter from '../../footer/PEFooter';
import PEHeader from '../../header/PEHeader';
import PEButton from '../../standard/buttons/PEButton';
import { Icon } from '../../standard/icon/Icon';
import PEIcon from '../../standard/icon/PEIcon';
import HStack from '../../utility/hStack/HStack';
import Spacer from '../../utility/spacer/Spacer';
import VStack from '../../utility/vStack/VStack';

export interface PublicCookPageProps {
    signedInUser?: SignedInUser;
    publicCook?: {
        cookId: string;
        rank: CookRank;
        biography: string;
        maximumParticipants?: number | null;
        maximumPrice?: number | null;
        maximumTravelDistance?: number | null;
        minimumParticipants?: number | null;
        minimumPrice?: number | null;
        travelExpenses: number;
        user: { firstName: string; profilePictureUrl?: string };
        location: Location;
        languages: Language[];
        menus: {
            menuId: string;
            title: string;
            description: string;
            pricePerAdult: number;
            pricePerChild?: number;
            preparationTime: number;
            basePrice: number;
            basePriceCustomers: number;
            currencyCode: CurrencyCode;
            greetingFromKitchen: boolean;
            kitchen?: Kitchen;
            categories: Category[];
            createdAt: Date;
        };
    };
}

export default function PublicCookPage({ signedInUser, publicCook }: PublicCookPageProps): ReactElement {
    // const { isMobile } = useResponsive();

    return (
        <VStack gap={40} className="w-full h-full overflow-hidden">
            <PEHeader signedInUser={signedInUser} />

            <VStack className="relative lg:w-[calc(100%-32px)] w-[calc(100%-64px)] max-w-screen-xl mx-8 lg:mx-4" gap={16}>
                {publicCook && (
                    <>
                        <HStack className="w-full bg-white shadow-primary box-border p-8 rounded-4" gap={16}>
                            {publicCook.user.profilePictureUrl && (
                                <Image
                                    style={{
                                        width: '120px',
                                        height: '120px',
                                        borderRadius: 4,
                                        objectPosition: 'center',
                                        objectFit: 'cover',
                                    }}
                                    src={publicCook.user.profilePictureUrl}
                                    alt={'Profile Picture'}
                                    width={120}
                                    height={120}
                                />
                            )}

                            {!publicCook.user.profilePictureUrl && (
                                <div className="bg-base rounded-2 flex justify-center items-center min-h-[120px] w-[120px]">
                                    <PEIcon edgeLength={32} icon={Icon.profileLight} />
                                </div>
                            )}

                            <VStack gap={16} style={{ alignItems: 'flex-start' }}>
                                <VStack style={{ alignItems: 'flex-start' }}>
                                    <p className="text-heading-m my-0">{publicCook.user.firstName}</p>
                                </VStack>
                                <span>{publicCook.rank}</span>
                            </VStack>

                            <Spacer />
                        </HStack>

                        <HStack
                            gap={16}
                            className="w-full bg-white shadow-primary box-border p-8 rounded-4"
                            style={{ justifyContent: 'flex-start' }}
                        >
                            <VStack gap={16} className="w-full" style={{ alignItems: 'flex-start' }}>
                                <p className="text-heading-m my-0">Bio</p>
                                {publicCook.biography}
                            </VStack>
                        </HStack>

                        <Link
                            href={{
                                pathname: '/cook-booking-request',
                                query: {
                                    cookId: publicCook.cookId,
                                    address: '',
                                    latitude: 0,
                                    longitude: 0,
                                    adults: 3,
                                    children: 1,
                                    date: moment().format(moment.HTML5_FMT.DATE),
                                },
                            }}
                            className="no-underline"
                        >
                            <PEButton title="Send Booking Request" onClick={(): void => undefined} />
                        </Link>

                        <HStack className="w-full">
                            <h2>Menu Portfolio</h2>
                            <Spacer />
                        </HStack>
                        <HStack gap={16} style={{ flexWrap: 'wrap' }} className="w-full">
                            {publicCook.menus.map((menu) => (
                                <PEMenuCard
                                    title={menu.title}
                                    description={menu.description}
                                    imageUrls={[]}
                                    pricePerPerson={100}
                                    currencyCode={menu.currencyCode}
                                    chefFirstName={publicCook.user.firstName}
                                    chefProfilePictureUrl={publicCook.user.profilePictureUrl}
                                    categories={menu.categories.map(({ title }) => title)}
                                    kitchen={menu.kitchen}
                                    onClick={(): void => undefined}
                                    fullWidth
                                />
                            ))}
                        </HStack>
                    </>
                )}
            </VStack>

            <Spacer />

            <PEFooter />
        </VStack>
    );
}
