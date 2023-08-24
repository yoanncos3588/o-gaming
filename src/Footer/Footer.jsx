function Footer() {
    const currentYear = new Date().getFullYear();
    return (
        <div className="flex justify-center p-4">
            O&apos;Gaming - {currentYear}
        </div>
    );
}

export default Footer;
