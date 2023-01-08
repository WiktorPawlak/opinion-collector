package pl.io.opinioncollector.domain.product.model;

public enum ProductOrigin {
    USA("United States of America"),
    BRAZIL("Brazil"),
    BULGARIA("Bulgaria"),
    CANADA("Canada"),
    CHINA("Republic of China"),
    EGYPT("Egypt"),
    FRANCE("France"),
    GERMANY("Germany"),
    GREECE("Greece"),
    ITALY("Italy"),
    NORWAY("Norway"),
    POLAND("Poland"),
    PORTUGAL("Portugal"),
    SPAIN("Spain"),
    SWEDEN("Sweden"),
    UNITED_KINGDOM("United Kingdom");

    private final String country;

    ProductOrigin(String country) {
        this.country = country;
    }

    public String getUrl() {
        return country;
    }

}
