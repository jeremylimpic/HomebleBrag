export function buildImageUrl(address) {
    const apiKey = 'AIzaSyC8GF4kvuZtT1UXDtkTb9TW4e2wVN60MVY';
    const encodedAddr = encodeURI(address);
    return `//maps.googleapis.com/maps/api/streetview?size=550x300&location=${encodedAddr}&key=${apiKey}`;
}
