import useTranslation from 'next-translate/useTranslation';
import { type ReactElement } from 'react';
import { type GoogleMapsPlacesResult } from '../../../../data-source/searchAddress';
import { type Location } from '../../../../shared-domain/Location';
import PEMap from '../../../map/PEMap';
import { Icon } from '../../../standard/icon/Icon';
import PEIconButton from '../../../standard/iconButton/PEIconButton';
import PEAutoCompleteTextField from '../../../standard/textFields/PEAutoCompleteTextField';
import VStack from '../../../utility/vStack/VStack';

export interface HomePageMapSectionProps {
    addressSearchText: string;
    onAddressSearchTextChange: (changedAddressSearchText: string) => void;
    searchResults: GoogleMapsPlacesResult[];
    selectedLocation?: Location;
    setSelectedLocation: (changedSelectedLocation: Location) => void;
    onSearch: () => void;
}

export default function HomePageMapSection({
    addressSearchText,
    onAddressSearchTextChange,
    searchResults,
    selectedLocation,
    setSelectedLocation,
    onSearch,
}: HomePageMapSectionProps): ReactElement {
    const { t } = useTranslation('home');

    return (
        <VStack gap={32} className="w-full">
            <span className="text-heading-xl lg:text-rem-heading-s text-center lg:uppercase">{t('map-section-header')}</span>

            <PEAutoCompleteTextField
                searchText={addressSearchText}
                onSearchTextChange={onAddressSearchTextChange}
                options={searchResults}
                getOptionLabel={(searchResult): string => searchResult.formatted_address}
                onOptionSelect={(selectedSearchResult): void =>
                    setSelectedLocation({
                        latitude: selectedSearchResult.geometry.location.lat,
                        longitude: selectedSearchResult.geometry.location.lng,
                    })
                }
                placeholder={'Location'}
                disabled={false}
                startContent={undefined}
                endContent={<PEIconButton icon={Icon.search} onClick={onSearch}></PEIconButton>}
            />

            <PEMap
                apiKey={process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY ?? ''}
                style={{ height: '500px', borderRadius: 16 }}
                location={selectedLocation}
            />
        </VStack>
    );
}
