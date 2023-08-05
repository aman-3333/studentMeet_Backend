import path from 'path';


// Default configuations applied to all environments
const REDIS_PROJECT = process.env.REDIS_PROJECT;
const defaultConfig = {
    env: process.env.NODE_ENV,
    APP_NAME: process.env.APP_NAME,
    TIME_ZONE: process.env.TIME_ZONE,
    get envs() {
        return {
            test: process.env.NODE_ENV === 'test',
            development: process.env.NODE_ENV === 'development',
            production: process.env.NODE_ENV === 'production',
        };
    },

    version: require('../../package.json').version,
    root: path.normalize(__dirname + '/..'),
    root_public: path.normalize(__dirname + '/..') + '/public/',
    port: process.env.PORT || 4567,
    ip: process.env.IP || '0.0.0.0',
    apiPrefix: '/api/',
    adminPrefix: '/api/admin/', // Could be /api/resource or /api/v2/resource
    companyApiPrefix: '/api/company/',
    hotelApiPrefix: '/api/hotel/',
    driverApiPrefix: '/api/driver/',
    VEHICLE_STATUS: {
        ONLINE: 'ONLINE',
        OFFLINE: 'OFFLINE',
        ONJOB: 'ONJOB',
    },
    TOTAL_REQUEST_ROUND: 5,
    GOOGLE_MAP_API_KEY: process.env.GOOGLE_MAP_API_KEY,
    DEFAULT_SURGE_REQUESTS: process.env.SURGE_REQUESTS || 10,
    vendorApiPrefix: '/api/vendor/',
    root_url: process.env.URL + ':' + process.env.PORT,
    userRoles: ['guest', 'User.model.js', 'admin'],
    userappVersion: process.env.USERAPP_VERSION,
    userappMinVersion: process.env.USERAPP_MIN_VERSION,
    userappMinAndroidVersion: process.env.USERAPP_MIN_ANDROID_VERSION,
    userappMinIosVersion: process.env.USERAPP_MIN_IOS_VERSION,
    userappIOSVersion: process.env.USERAPP_IOS_VERSION,
    userappAndroidVersion: process.env.USERAPP_ANDROID_VERSION,
    vendorappVersion: process.env.VENDORAPP_VERSION,
    vendorappMinVersion: process.env.VENDORAPP_MIN_VERSION,
    vendorappIOSVersion: process.env.VENDORAPP_IOS_VERSION,
    vendorappAndroidVersion: process.env.VENDORAPP_ANDROID_VERSION,
    MAILGUN_API_KEY: process.env.MAILGUN_API_KEY,
    MAILGUN_DOMAIN: process.env.MAILGUN_DOMAIN,
    IS_LINUX: true,
    DEFAULT_USER_IMAGE_PATH: 'user_images/',
    DEFAULT_PERSONNEL_IMAGE_PATH: 'personnel/',
    DEFAULT_CASES_PATH: 'cases/',
    DEFAULT_TOUR_CATEGORY: 'tourcategory/',
    DEFAULT_CATEGORY_PATH: 'categories/',
    DEFAULT_PROVIDER_USER_PATH: 'provider_users/',
    DEFAULT_COUNTRY_PATH: 'countries/',
    DEFAULT_JOB_IMAGE_PATH: 'jobs/',
    DEFAULT_LOCATION_IMAGE_PATH: 'locations/',
    DEFAULT_PROMOTION_PATH: 'promotions/',
    DEFAULT_CITY_PATH: 'cities/',
    DEFAULT_COUPON_PATH: 'coupons/',
    DEFAULT_PRODUCT_PATH: 'products/',
    DEFAULT_COMPANY_PATH: 'company/',
    DEFAULT_HOTEL_PATH: 'hotels/',
    DEFAULT_DRIVER_PATH: 'drivers/',
    DEFAULT_VEHICLE_DOC_PATH: 'vehicles/documents/',
    DEFAULT_VEHICLE_PLATE_PATH: 'vehicles/plate/',
    DEFAULT_VEHICLE_PHOTO_PATH: 'vehicles/photos/',
    DEFAULT_INSURANCE_PATH: 'insurances/',
    DEFAULT_OFFER_PATH: 'offers/',
    DEFAULT_ITEM_PATH: 'items/',
    DEFAULT_TOUR_PATH: 'tours/',
    DEFAULT_REVIEW_PATH: 'reviews/',
    DEFAULT_AVATAR_PATH: 'avatars/',
    DEVICE_LIMIT: 150,
    DEFAULT_STATUS: {ACTIVE: 'ACTIVE', INACTIVE: 'INACTIVE', DELETED: 'DELETED'},
    DAYS: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    INTENSITY_ARR: ['LOW', 'MEDIUM', 'HIGH'],
    TEXTLOCAL_API_KEY: process.env.TEXTLOCAL_API_KEY,
    TEXTLOCAL_SENDER: process.env.TEXTLOCAL_SENDER,

    DELIVERY_PREFERENCES: {
        CONTACT_LESS: 'CONTACT_LESS',
        RING_DOORBELL: 'RING_DOORBELL',
    },
    NOTIFICATION: {
        GENERAL: 'GENERAL',
        DASHBOARD: 'DASHBOARD',
        HOME: 'HOME',
        ORDER_ACCEPTED: 'ORDER_ACCEPTED',
        ORDER_ASSIGNED: 'ORDER_ASSIGNED',
        ORDER_REJECTED: 'ORDER_REJECTED',
        ORDER_ON_PICKUP_LOCATION: 'ORDER_ON_PICKUP_LOCATION',
        ORDER_ON_WAY: 'ORDER_ON_WAY',
        ORDER_ON_DROP_LOCATION: 'ORDER_ON_DROP_LOCATION',
        ORDER_NEARBY: 'ORDER_NEARBY',
        ORDER_DELIVERED: 'ORDER_DELIVERED',
        ORDER_UPDATE: 'ORDER_UPDATE',
        MESSAGE_RECEIVED: 'MESSAGE_RECEIVED',
        TOUR_STARTED: 'TOUR_STARTED',
        TOUR_COMPLETED: 'TOUR_COMPLETED',
        DRIVER_ARRIVED: 'DRIVER_ARRIVED',
        USER_ONBOARDED: 'USER_ONBOARDED',
        EDIT_PROFILE: 'EDIT_PROFILE',
        PROFILE: 'PROFILE',
        ORDERS: 'ORDERS',
        ORDER_DETAIL: 'ORDER_DETAIL',
        PACK_ACTIVATED: 'PACK_ACTIVATED',
        WALLET_ADDED: 'WALLET_ADDED',
    },
    DRIVER_NOTIFICATIONS: {
        GENERAL: 'GENERAL',
        NEW_JOB: 'NEW_JOB',
        NEW_VERIFICATION: 'NEW_VERIFICATION'
    },
    DEFAULT_PUB_EVENTS: {
        COMPANY: {
            JOB_START: REDIS_PROJECT + 'COMPANY_JOB_START',
            ORDER_DELIVERED: REDIS_PROJECT + 'COMPANY_ORDER_DELIVERED',
            ORDER_UNDELIVERED: REDIS_PROJECT + 'COMPANY_ORDER_UNDELIVERED',
            LOCATION_UPDATE: REDIS_PROJECT + 'COMPANY_LOCATION_UPDATE',
            JOB_END: REDIS_PROJECT + 'COMPANY_JOB_END',

            NEW_ORDER: REDIS_PROJECT + 'COMPANY_NEW_ORDER',
            ORDER_UPDATE: REDIS_PROJECT + 'COMPANY_ORDER_UPDATE',

            DRIVER_ADD: REDIS_PROJECT + 'COMPANY_DRIVER_ADD',
            DRIVER_REMOVE: REDIS_PROJECT + 'COMPANY_DRIVER_REMOVE',
            DRIVER_UPDATE: REDIS_PROJECT + 'COMPANY_DRIVER_UPDATE',
        },
        USER: {
            ORDER_ACCEPTED: REDIS_PROJECT + 'ORDER_ACCEPTED',
            ORDER_ASSIGNED: REDIS_PROJECT + 'ORDER_ASSIGNED',
            ORDER_REJECTED: REDIS_PROJECT + 'ORDER_REJECTED',
            ORDER_ON_PICKUP_LOCATION: REDIS_PROJECT + 'ORDER_ON_PICKUP_LOCATION',
            ORDER_ON_WAY: REDIS_PROJECT + 'ORDER_ON_WAY',
            ORDER_ON_DROP_LOCATION: REDIS_PROJECT + 'ORDER_ON_DROP_LOCATION',
            ORDER_DELIVERED: REDIS_PROJECT + 'ORDER_DELIVERED',

            JOB_STARTED: REDIS_PROJECT + 'JOB_STARTED',
            DRIVER_ARRIVED: REDIS_PROJECT + 'DRIVER_ARRIVED',
            JOB_COMPLETED: REDIS_PROJECT + 'JOB_COMPLETED',
            ON_BOARDED: REDIS_PROJECT + 'ON_BOARDED',
            USER_MESSAGE_RECEIVED: REDIS_PROJECT + 'USER_MESSAGE_RECEIVED',
            ORDER_DATA: REDIS_PROJECT + 'ORDER_DATA',
        },
        DRIVER: {
            NEW_JOB: REDIS_PROJECT + 'NEW_JOB',
            DRIVER_MESSAGE_RECEIVED: REDIS_PROJECT + 'DRIVER_MESSAGE_RECEIVED',
            DRIVER_LOCATION_UPDATE: REDIS_PROJECT + 'DRIVER_LOCATION_UPDATE',
        },
        NOTIFICATION: REDIS_PROJECT + 'NOTIFICATION',
        MESSAGE_RECEIVED: REDIS_PROJECT + 'MESSAGE_RECEIVED',
        CASE_UPDATE: REDIS_PROJECT + 'CASE_UPDATE',
        TRUCK_LOCATION: REDIS_PROJECT + 'TRUCK_LOCATION',
        CASE_MARKERS: REDIS_PROJECT + 'CASE_MARKERS',
        RIDE_UPDATE: REDIS_PROJECT + 'RIDE_UPDATE',
        RIDE_REQUEST: REDIS_PROJECT + 'RIDE_REQUEST',
        STATION_DATA: REDIS_PROJECT + 'STATION_DATA',
    },
    ADMIN_PUB: {
        CASE_ADDED: REDIS_PROJECT + 'ADMIN_CASE_ADDED',
        CASE_UPDATE: REDIS_PROJECT + 'ADMIN_CASE_UPDATE',
        CASE_COMPLETED: REDIS_PROJECT + 'ADMIN_CASE_COMPLETED',
    },
    COUPON_TYPE: {
        GENERAL: 'GENERAL',
        CATEGORY: 'CATEGORY',
        PRODUCT: 'PRODUCT',
        USER: 'USER',
        FIRST_TRANSACTION: 'FIRST_TRANSACTION',
    },
    TOUR_TYPES: {
        FIXED: 'FIXED',
        PER_PERSON: 'PER_PERSON',
    },
    HOTEL_TYPE: {
        AIRBNB: 'AIRBNB',
        HOSTEL: 'HOSTEL',
        HOTEL_PARTNER: 'HOTEL_PARTNER',
    },
    DRIVER_NOTIFICATION: {
        NEW_BATCH: 'NEW_BATCH',
    },
    PICKUP_ADDRESS: {
        name: 'KsheerSagar',
        address: 'Varanashi',
        contact: '+91 9999999999',
        location: [82.9577646, 25.3029366],
    },
    DELIVERY_TYPE: {
        DAILY: 'DAILY',
        ALTERNATIVE: 'ALTERNATIVE',
        CUSTOM: 'CUSTOM',
    },
    DELIVERY_SLOTS: [{
        time: '07:00',
        time_min: 420,
        unformatted: '07:00 - 08:00am',
        index: 0,
        delivery_index: 0,
    }, {
        time: '08:00',
        time_min: 480,
        unformatted: '08:00 - 09:00am',
        index: 1,
        delivery_index: 1,
    }, {
        time: '09:00',
        time_min: 540,
        unformatted: '09:00 - 10:00am',
        index: 2,
        delivery_index: 2,
    }, {
        time: '10:00',
        time_min: 600,
        unformatted: '10:00 - 11:00am',
        index: 3,
        delivery_index: 3,
    }],
    TOTAL_DELIVERY_SLOT: 4,
    JOB_STATUS: {
        PENDING: 'PENDING',
        DELIVERED: 'DELIVERED',
        UNDELIVERED: 'UNDELIVERED',
        REJECTED: 'REJECTED',
        NOT_ASSIGNED: 'NOT_ASSIGNED',
        NO_CASH: 'NO_CASH',
        ASSIGNED: 'ASSIGNED',

    },
    DRIVER_JOB_STATUS: {
        PENDING: 'PENDING',
        COMPLETED: 'COMPLETED',
        REJECTED: 'REJECTED',
        IN_PROCESS: 'IN_PROCESS',
    },
    VERIFICATION_JOB_STATUS: {
        PENDING: 'PENDING',
        COMPLETED: 'COMPLETED',
        REJECTED: 'REJECTED',
    },
    VERIFICATION_STATUS: {
        PENDING: 'PENDING',
        VERIFIED: 'VERIFIED',
        UPDATED: 'UPDATED',
        REJECTED: 'REJECTED',
    },
    GENERAL_STATUS: {
        PENDING: 'PENDING',
        ACTIVE: 'ACTIVE',
        INACTIVE: 'INACTIVE',
        DELETED: 'DELETED',
    },
    PRODUCT_DELIVERY_STATUS: {
        ACTIVE: 'ACTIVE',
        SKIPPED: 'SKIPPED'
    },
    ORDER_STATUS: {
        PENDING: 'PENDING',
        ASSIGNED: 'ASSIGNED',
        PAYMENT: 'PAYMENT',
        ON_PICKUP_LOCATION: 'ON_PICKUP_LOCATION',
        OUT_FOR_DELIVERY: 'OUT_FOR_DELIVERY',
        ON_DROP_LOCATION: 'ON_DROP_LOCATION',
        DELIVERED: 'DELIVERED',
        UNDELIVERED: 'UNDELIVERED',
        REJECTED: 'REJECTED',
        ACCEPTED: 'ACCEPTED',
        ACTIVE: 'ACTIVE',
        ORDER_NEARBY: 'ORDER_NEARBY',
    },
    SCHEDULE_TYPE: {
        RECURSIVE: 'RECURSIVE',
        ONE_TIME: 'ONE_TIME',
    },
    TRANSACTIONS_TYPES: {
        DEBIT: 'DEBIT',
        CREDIT: 'CREDIT',
    },
    FCM_KEY: process.env.FCM_KEY,
    TWILIO: {
        TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
        TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
        TWILIO_PHONE_NUMBER: process.env.TWILIO_PHONE_NUMBER,
        TWILIO_WHATSAPP_PHONE_NUMBER: process.env.TWILIO_WHATSAPP_PHONE_NUMBER,
    },
    GOOGLE_GEO_API: process.env.GOOGLE_GEO_API,
    GOOGLE_API_AI_KEY: process.env.GOOGLE_API_AI_KEY,
    limit: 15,
    PROJECT_NAME: process.env.PROJECT_NAME,
    DEFAULT_EMAIL: process.env.DEFAULT_EMAIL,
    DEFAULT_PING_COUNT: 10,
    DEFAULT_LIST_LENGTH: 200,
    TRIAL_DELIVERIES: 3,
    NEXT_PROCESSING_TIME: (1000 * 60),
    NEXT_PROCESSING_TIME_NODATA: (1000 * 30),
    MAX_REQUEST_RETRIES: 5,
    DEFAULT_API_LIST_LENGTH: 10,
    HEARTBEAT_TIMEOUT: 15000,
    HEARTBEAT_INTERVAL: 10000,
    DEFAULT_TAGS: ['VEG', 'VEGAN', 'GLUTEN FREE', 'DIARY'],
    DEFAULT_PROVIDER_ROLES: ['CEO', 'MANAGER', 'CUSTOMER_CARE'],
    RAZORPAY_KEY: process.env.RAZORPAY_KEY,
    RAZORPAY_KEY_SECRET: process.env.RAZORPAY_KEY_SECRET,
    CAN_UPDATE_ERROR: 'Your delivery order has been prepared and we will not be able to update your plan at the moment. Please try updating the plan after the scheduled delivery.',
    DEFAULT_PACKAGE_PRICE: 30,
    DRIVER_PAYOUT: {
      MIN_DELIVERIES: 14,
        MIN_AMOUNT: 100
    },
    BEFORE_UPDATE_HOURS: 13,
    USER_ADDRESS: {
        address: '',
        area: '',
        landmark: '',
        city: '',
        pincode: '',
    },
    /**
     * MongoDB configuration options
     */
    mongo: {
        seed: true,
        options: {
            db: {
                safe: true,
            },
        },
    },

    /**
     * Security configuation options regarding sessions, authentication and hashing
     */
    security: {
        sessionSecret: process.env.SESSION_SECRET || 'base64:Olvke97cjrcZg4ZYv2nlXxHTLNIs2XWFw9oVuH/OH5E=',
        sessionExpiration: process.env.SESSION_EXPIRATION || 60 * 60 * 24 * 365, // 1 year
        saltRounds: process.env.SALT_ROUNDS || 12,
    },
};

// Environment specific overrides
const environmentConfigs = {
    development: {
        mongo: {
            uri: process.env.MONGO_URI || 'mongodb://localhost/development',
        },
        security: {
            saltRounds: 4,
        },
        redis: {
            port: process.env.REDIS_PORT,
            url: process.env.REDIS_URL,
            project: process.env.REDIS_PROJECT,
        },
        public_url: process.env.URL + ':' + process.env.PORT + '/public/',
    },
    test: {
        port: 5678,
        mongo: {
            uri: process.env.MONGO_URI || 'mongodb://localhost/test',
        },
        security: {
            saltRounds: 4,
        },
        redis: {
            port: process.env.REDIS_PORT,
            url: process.env.REDIS_URL,
            project: process.env.REDIS_PROJECT,
        },
    },
    production: {
        mongo: {
            // seed: false,
            uri: process.env.MONGO_URI,
        },
        security: {
            saltRounds: 4,
        },
        redis: {
            port: process.env.REDIS_PORT,
            url: process.env.REDIS_URL,
            project: process.env.REDIS_PROJECT,
        },
        public_url: process.env.URL + '/public/',
    },
};

// Recursively merge configurations

