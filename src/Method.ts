/* eslint-disable */

const Core = { //   \[\s*description\s*=\s*"(.*?)"(?:,\s+details\s*="(.*?)")?(?:,\s+http_status_code\s*=\s*[0-9]+)?\s*\]\s*(.*?)\s*=\s*([0-9]+);    "$4":["$3","$1","$2"],
    Error: {
        1: [
            'ERR_SYSTEM',
            'General system error.',
        ],
        2: [
            'ERR_COMPONENT_NOT_FOUND',
            'Component not found.',
        ],
        3: [
            'ERR_COMMAND_NOT_FOUND',
            'Command not found.',
        ],
        4: [
            'ERR_AUTHENTICATION_REQUIRED',
            'This command requires you to log in/provide access credentials.',
        ],
        5: [
            'ERR_TIMEOUT',
            'Command timed out.',
        ],
        6: [
            'ERR_DISCONNECTED',
            'Calling session got disconnected.',
        ],
        7: [
            'ERR_DUPLICATE_LOGIN',
            'Duplicate user has logged in.',
        ],
        8: [
            'ERR_AUTHORIZATION_REQUIRED',
            "You don't have the required permission to perform the action.",
        ],
        9: [
            'ERR_CANCELED',
            'The job, fiber or action has been canceled.',
        ],
        10: [
            'ERR_CUSTOM_REQUEST_HOOK_FAILED',
            "General error thrown by a RPC's custom request hook, triggered by custom code.",
        ],
        11: [
            'ERR_CUSTOM_RESPONSE_HOOK_FAILED',
            "General error thrown by a RPC's custom response hook, triggered by custom code.",
        ],
        12: [
            'ERR_TDF_STRING_TOO_LONG',
            'General error thrown by TDF decoder when incoming string exceeds max length defined for this field in TDF',
        ],
        13: [
            'ERR_INVALID_TDF_ENUM_VALUE',
            'General error thrown by TDF decoder when incoming enum value is not a defined enum for this field in TDF',
        ],
        14: [
            'ERR_MOVED',
            'The command must be executed on a Blaze instance that owns the object refered to by the request.',
        ],
        16: [
            'ERR_COMMAND_FIBERS_MAXED_OUT',
            'The command fibers have hit the max limit.',
        ],
        17: [
            'ERR_INVALID_ENDPOINT',
            'The command has come on the wrong endpoint.',
        ],
        18: [
            'ERR_TDF_STRING_NOT_UTF8',
            'General error thrown by TDF encoder on client when string is not valid utf8.',
            'The error is only introduced on client in order to preserve backward compatibility between older clients and server.',
        ],
        19: [
            'ERR_UNAVAILABLE',
            'The service is currently unavailable. This is most likely a transient condition and may be corrected by retrying with a backoff.',
        ],
        20: [
            'ERR_NOT_PRIMARY_PERSONA',
            'Action only allowed for a primary persona.',
        ],
        101: [
            'ERR_DB_SYSTEM',
            'General DB error',
        ],
        102: [
            'ERR_DB_NOT_CONNECTED',
            'Not connected to the DB',
        ],
        103: [
            'ERR_DB_NOT_SUPPORTED',
            'Operation not supported',
        ],
        104: [
            'ERR_DB_NO_CONNECTION_AVAILABLE',
            'No connection could be obtained',
        ],
        105: [
            'ERR_DB_DUP_ENTRY',
            'A duplicate entry already exists in the DB',
        ],
        106: [
            'ERR_DB_NO_SUCH_TABLE',
            'Table does not exist',
        ],
        107: [
            'ERR_DB_DISCONNECTED',
            'Lost connection to DB',
        ],
        108: [
            'ERR_DB_TIMEOUT',
            'Request timed out',
        ],
        109: [
            'ERR_DB_INIT_FAILED',
            'Driver initialization failed',
        ],
        110: [
            'ERR_DB_TRANSACTION_NOT_COMPLETE',
            'Connection was released while a transaction was pending',
        ],
        111: [
            'ERR_DB_LOCK_DEADLOCK',
            'Deadlock',
        ],
        112: [
            'ERR_DB_DROP_PARTITION_NON_EXISTENT',
            'Non existent partition',
        ],
        113: [
            'ERR_DB_SAME_NAME_PARTITION',
            'Partition already exists',
        ],
        114: [
            'ERR_SERVER_BUSY',
            '**Deprecated - use ERR_TIMEOUT instead** The server is too busy to process this request.  Please try again later.',
        ],
        115: [
            'ERR_GUEST_SESSION_NOT_ALLOWED',
            'This error will be returned when a guest session tries to call a RPC which is not allowed guest session to call.',
        ],
        116: [
            'ERR_DB_USER_DEFINED_EXCEPTION',
            'The user defined error.',
        ],
        117: [
            'ERR_COULDNT_CONNECT',
            'Could not connect to external service when making request. Equivalent to curl error (7).',
        ],
        118: [
            'ERR_DB_PREVIOUS_TRANSACTION_IN_PROGRESS',
            'A transaction is already in progress',
        ],
        119: [
            'ERR_DB_NO_ROWS_AFFECTED',
            'No rows were affected as a result of the query.',
        ],
        120: [
            'ERR_DB_NO_SUCH_THREAD',
            'No such db thread',
        ],
    },
};

const Authentication = {
    Command: {
        10: 'login',
        11: 'trustedLogin',
        29: 'listUserEntitlements2',
        30: 'getAccount',
        31: 'grantEntitlement',
        32: 'listEntitlements',
        34: 'getUseCount',
        35: 'decrementUseCount',
        39: 'grantEntitlement2',
        43: 'modifyEntitlement2',
        47: 'getPrivacyPolicyContent',
        48: 'listPersonaEntitlements2',
        52: 'getOptIn',
        53: 'enableOptIn',
        54: 'disableOptIn',
        60: 'expressLogin',
        61: 'stressLogin',
        70: 'logout',
        90: 'getPersona',
        100: 'listPersonas',
        230: 'createWalUserSession',
        240: 'checkLegalDoc',
        242: 'getEmailOptInSettings',
        246: 'getTermsOfServiceContent',
        260: 'getOriginPersona',
        290: 'guestLogin',
        300: 'getDecryptedBlazeIds',
    },
    Error: {
        1: [
            'AUTH_ERR_INVALID_TOKEN',
            'The token provided was not a valid Identity 2.0 access token',
        ],
        2: [
            'AUTH_ERR_INVALID_REQUEST',
            'Generic error if specific error could not be obtained for a failed request.',
        ],
        3: [
            'AUTH_ERR_INVALID_AUTHCODE',
            'The auth code provided could not be used to log to requested service.',
        ],
        4: [
            'AUTH_ERR_INVALID_PLATFORM',
            'The platform that service belongs to is not allowed in the login command.',
        ],
        6: [
            'AUTH_ERR_INVALID_SANDBOX_ID',
            'The supplied sandbox id is not supported on this server.',
        ],
        10: [
            'AUTH_ERR_INVALID_COUNTRY',
            'The country does not exist or is invalid',
        ],
        11: [
            'AUTH_ERR_INVALID_USER',
            'The user does not exist or is invalid',
        ],
        12: [
            'AUTH_ERR_INVALID_PASSWORD',
            'The supplied password was invalid',
        ],
        14: [
            'AUTH_ERR_EXPIRED_TOKEN',
            'The supplied auth token was expired',
        ],
        15: [
            'AUTH_ERR_EXISTS',
            'Cannot create user/persona because email/displayname already exists',
        ],
        16: [
            'AUTH_ERR_TOO_YOUNG',
            'User is too young, cannot create underage account',
        ],
        17: [
            'AUTH_ERR_NO_ACCOUNT',
            'The account does not exist',
        ],
        18: [
            'AUTH_ERR_PERSONA_NOT_FOUND',
            'The requested persona name was not found.',
        ],
        19: [
            'AUTH_ERR_PERSONA_INACTIVE',
            'The requested persona is not active.',
        ],
        20: [
            'AUTH_ERR_INVALID_PMAIL',
            'Invalid parental email.',
        ],
        21: [
            'AUTH_ERR_INVALID_FIELD',
            'One of the input fields was invalid',
        ],
        22: [
            'AUTH_ERR_INVALID_EMAIL',
            'Invalid email',
        ],
        23: [
            'AUTH_ERR_INVALID_STATUS',
            'Invalid account status',
        ],
        32: [
            'AUTH_ERR_PERSONA_BANNED',
            'The requested persona is banned.',
        ],
        33: [
            'AUTH_ERR_INVALID_PERSONA',
            'The persona does not exist or is invalid',
        ],
        34: [
            'AUTH_ERR_CURRENT_PASSWORD_REQUIRED',
            'The command required the current password of the Nucleus account, the password provided is incorrect.',
        ],
        41: [
            'AUTH_ERR_DEACTIVATED',
            'Account deactivated',
        ],
        43: [
            'AUTH_ERR_BANNED',
            'Account banned from online play',
        ],
        44: [
            'AUTH_ERR_DISABLED',
            'Account has been disabled',
        ],
        45: [
            'AUTH_ERR_DUPLICATE_LOGIN',
            'Account is already logged in with a different persona.',
        ],
        46: [
            'AUTH_ERR_RESTRICTION_VIOLATION',
            'There was a restriction violation on a product',
        ],
        47: [
            'AUTH_ERR_MULTIPLE_WALLET_ACCOUNTS_FOUND',
            'More than one wallet was found.',
        ],
        48: [
            'AUTH_ERR_INVALID_PRODUCT_CONFIGURATION',
            'The product is not configured correctly in the catalog',
        ],
        49: [
            'AUTH_ERR_ENTITLEMENT_TAG_MISSING',
            'The product in the catalog does not have an entitlement tag defined',
        ],
        50: [
            'AUTH_ERR_BAD_GATEWAY',
            'Received an invalid response from the upstream server',
        ],
        54: [
            'AUTH_ERR_NO_ASSOCIATED_PRODUCT',
            'No Associated product for this key',
        ],
        55: [
            'AUTH_ERR_INVALID_MAPPING_ERROR',
            'Invalid Mapping',
        ],
        56: [
            'AUTH_ERR_NO_SUCH_GROUP_NAME',
            'Group name not found',
        ],
        57: [
            'AUTH_ERR_MISSING_PERSONAID',
            'Missing personaId',
        ],
        58: [
            'AUTH_ERR_USER_DOES_NOT_MATCH_PERSONA',
            'User not match with persona',
        ],
        59: [
            'AUTH_ERR_WHITELIST',
            'Group name failed whilelist test',
        ],
        60: [
            'AUTH_ERR_LINK_PERSONA',
            'Failed linking persona and entitlement',
        ],
        61: [
            'AUTH_ERR_NO_SUCH_GROUP',
            'No such group',
        ],
        63: [
            'AUTH_ERR_NO_SUCH_ENTITLEMENT',
            'No active entitlement matching the criteria',
        ],
        66: [
            'AUTH_ERR_USECOUNT_ZERO',
            "The use count for the user's entitlement is 0",
        ],
        67: [
            'AUTH_ERR_ENTITLEMETNTAG_EMPTY',
            "The entitlement tag is required but it's empty string in requirement",
        ],
        70: [
            'AUTH_ERR_GROUPNAME_REQUIRED',
            'Groupname is required',
        ],
        71: [
            'AUTH_ERR_GROUPNAME_INVALID',
            'A groupname in group list is empty string',
        ],
        72: [
            'AUTH_ERR_TOO_MANY_ENTITLEMENTS',
            'Too many entitlements were found in Nucleus. Requestor should use pagination to fetch smaller result sets.',
        ],
        73: [
            'AUTH_ERR_PAGESIZE_ZERO',
            "Page size in the request can't be 0",
        ],
        74: [
            'AUTH_ERR_ENTITLEMENT_TAG_REQUIRED',
            'Entitlement tag is required',
        ],
        75: [
            'AUTH_ERR_PAGENO_ZERO',
            "Page No in the request can't be 0",
        ],
        76: [
            'AUTH_ERR_MODIFIED_STATUS_INVALID',
            'You only can modify an entitlement status to DISABLED, DELETED or BANNED',
        ],
        77: [
            'AUTH_ERR_USECOUNT_INCREMENT',
            'You only can decrement the use count and can not increment it',
        ],
        78: [
            'AUTH_ERR_TERMINATION_INVALID',
            "You can't make the termination date LATER, than it is currently.  You can make it sooner",
        ],
        79: [
            'AUTH_ERR_UNKNOWN_ENTITLEMENT',
            "The entitlement doesn't exist",
        ],
        80: [
            'AUTH_ERR_EXCEEDS_PSU_LIMIT',
            'PSU cutoff for entitlement type is less than the current connected user count',
        ],
        81: [
            'AUTH_ERR_OPTIN_NAME_REQUIRED',
            'The opt-in name is required',
        ],
        82: [
            'AUTH_ERR_INVALID_OPTIN',
            'The provided opt-in is invalid ',
        ],
        83: [
            'AUTH_ERR_OPTIN_MISMATCH',
            'German double opt in cannot be set to true if global opt in is not set to true as well',
        ],
        84: [
            'AUTH_ERR_NO_SUCH_OPTIN',
            'The user has not opted in for the given optInType',
        ],
        85: [
            'AUTH_ERR_AUTHID_REQUIRED',
            'The ID of the external authentication data is required',
        ],
        86: [
            'AUTH_ERR_PERSONA_EXTREFID_REQUIRED',
            'The ID for the persona external reference is required',
        ],
        87: [
            'AUTH_ERR_SOURCE_REQUIRED',
            'The requestor/game that is adding the external authentication is required',
        ],
        88: [
            'AUTH_ERR_APPLICATION_REQUIRED',
            'The application ID or other identifier associated with the external authentication token is required',
        ],
        89: [
            'AUTH_ERR_TOKEN_REQUIRED',
            'The token associated with the external authentication is required',
        ],
        90: [
            'AUTH_ERR_PARAMETER_TOO_LENGTH',
            'The input parameter exceeds the max value (255) on the server',
        ],
        91: [
            'AUTH_ERR_NO_SUCH_PERSONA_REFERENCE',
            'The persona external reference does not exist',
        ],
        93: [
            'AUTH_ERR_INVALID_SOURCE',
            "Invalid source provided. The source doesn't exist in the system",
        ],
        94: [
            'AUTH_ERR_NO_SUCH_AUTH_DATA',
            'The authentication data does not exist',
        ],
        95: [
            'AUTH_ERR_NOT_PRIMARY_PERSONA',
            'Account already has primary persona and updating primary via authentication is not allowed at this time.',
        ],
        101: [
            'AUTH_ERR_USER_INACTIVE',
            "User's status is inactive (disabled, banned, etc.)",
        ],
        102: [
            'AUTH_ERR_UNEXPECTED_ACTIVATION',
            "User isn't awaiting activation.",
        ],
        103: [
            'AUTH_ERR_NAME_MISMATCH',
            "User's display name doesn't match gamer tag.",
        ],
        105: [
            'AUTH_ERR_INVALID_NAMESPACE',
            'The supplied namespace was invalid.',
        ],
        198: [
            'AUTH_ERR_FIELD_MIN_LOWER_CHARS',
            'The value contains invalid characters.',
        ],
        199: [
            'AUTH_ERR_FIELD_MIN_UPPER_CHARS',
            'The value is too short.',
        ],
        200: [
            'AUTH_ERR_FIELD_MIN_DIGITS',
            'The value is too long.',
        ],
        201: [
            'AUTH_ERR_FIELD_INVALID_CHARS',
            'The value contains invalid characters.',
        ],
        202: [
            'AUTH_ERR_FIELD_TOO_SHORT',
            'The value is too short.',
        ],
        204: [
            'AUTH_ERR_FIELD_MUST_BEGIN_WITH_LETTER',
            'The value must begin with a letter.',
        ],
        205: [
            'AUTH_ERR_FIELD_MISSING',
            'The value is missing.',
        ],
        206: [
            'AUTH_ERR_FIELD_INVALID',
            'The value is not valid for this field.',
        ],
        207: [
            'AUTH_ERR_FIELD_NOT_ALLOWED',
            'The value contains profanity or disallowed text.',
        ],
        208: [
            'AUTH_ERR_FIELD_NEEDS_SPECIAL_CHARS',
            'The value must contain special characters.',
        ],
        209: [
            'AUTH_ERR_FIELD_ALREADY_EXISTS',
            'The value already exists.',
        ],
        210: [
            'AUTH_ERR_FIELD_NEEDS_CONSENT',
            'The user requires parental consent.',
        ],
        211: [
            'AUTH_ERR_FIELD_TOO_YOUNG',
            'The user is too young to create an account.',
        ],
        212: [
            'AUTH_ERR_ASSOCIATION_TOO_YOUNG',
            'The associated user is too young, cannot associate with the new created account.',
        ],
        300: [
            'AUTH_ERR_TOO_MANY_PERSONA_FOR_NAMESPACE',
            'The maximum number of personas in this namespace has been reached for this account. Cannot create additional personas.',
        ],
        303: [
            'AUTH_ERR_NEEDS_PMAIL',
            'The user requires parental mail.',
        ],
        307: [
            'AUTH_ERR_NO_PARENT_SESSION',
            'A parent session is required to create a guest MLU session but was not found.',
        ],
        308: [
            'AUTH_ERR_NO_XBLTOKEN',
            "No XBL token is available for the user. This is likely due to the user being externally available in MS, but not 'known' to Nucleus.",
        ],
        309: [
            'AUTH_ERR_NO_PSNTOKEN',
            "No PSN token is available for the user. This is likely due to the user being externally available in PSN, but not 'known' to Nucleus.",
        ],
        310: [
            'AUTH_ERR_TRIAL_PERIOD_CLOSED',
            "Attempting to grant an entitlement outside the trial period. For period trials, this means the current time is outside the start/end time. For managed lifecycle, this means we attempt to grant an entitlement with a status that doesn't match based on the start/end time (PENDING, ACTIVE, DISABLED for before, during, and after, respectively.)",
        ],
        311: [
            'AUTH_ERR_EXPIRED_1PTOKEN',
            'The first party token expired for the user. The user may need to relogin to Nucleus with a new token.',
        ],
    },
};

const GameManager = {
    Command: {
        1: 'createGame',
        2: 'destroyGame',
        3: 'advanceGameState',
        4: 'setGameSettings',
        5: 'setPlayerCapacity',
        6: 'setPresenceMode',
        7: 'setGameAttributes',
        8: 'setPlayerAttributes',
        9: 'joinGame',
        10: 'createGameTemplate',
        11: 'removePlayer',
        15: 'finalizeGameCreation',
        16: 'startMatchmakingScenario',
        17: 'cancelMatchmakingScenario',
        18: 'setPlayerCustomData',
        19: 'replayGame',
        20: 'returnDedicatedServerToPool',
        21: 'setDedicatedServerAttributes',
        22: 'leaveGameByGroup',
        23: 'migrateGame',
        24: 'updateGameHostMigrationStatus',
        25: 'resetDedicatedServer',
        26: 'updateGameSession',
        27: 'banPlayer',
        28: 'matchmakingDedicatedServerOverride',
        29: 'updateMeshConnection',
        30: 'joinGameByUserList',
        31: 'removePlayerFromBannedList',
        32: 'clearBannedList',
        33: 'getBannedList',
        34: 'getMatchmakingDedicatedServerOverrides',
        35: 'matchmakingFillServersOverride',
        36: 'getMatchmakingFillServersOverride',
        38: 'addQueuedPlayerToGame',
        39: 'updateGameName',
        40: 'ejectHost',
        41: 'setGameModRegister',
        42: 'setGameEntryCriteria',
        43: 'preferredJoinOptOut',
        44: 'destroyGames',
        45: 'createOrJoinGame',
        46: 'requestPlatformHost',
        47: 'demoteReservedPlayerToQueue',
        50: 'createPseudoGame',
        51: 'createPseudoGames',
        52: 'cancelCreatePseudoGames',
        53: 'destroyAllPseudoGames',
        54: 'captureGameManagerEnvironment',
        55: 'isGameCaptureDone',
        56: 'getRedisDumpLocations',
        65: 'meshEndpointsConnected',
        66: 'meshEndpointsDisconnected',
        67: 'meshEndpointsConnectionLost',
        68: 'requestConnectivityViaCCS',
        69: 'freeConnectivityViaCCS',
        70: 'requestLeaseExtensionViaCCS',
        90: 'createTournamentGame',
        91: 'cancelTournamentGame',
        92: 'getTournamentGameStatus',
        98: 'getGameBrowserAttributesConfig',
        99: 'getGameListByScenario',
        100: 'getGameListSnapshot',
        101: 'getGameListSubscription',
        102: 'destroyGameList',
        103: 'getFullGameData',
        104: 'getMatchmakingConfig',
        105: 'getGameDataFromId',
        106: 'addAdminPlayer',
        107: 'removeAdminPlayer',
        108: 'getScenarioAttributesConfig',
        109: 'changeGameTeamId',
        110: 'migrateAdminPlayer',
        111: 'getUserSetGameListSubscription',
        112: 'swapPlayers',
        113: 'getGameDataByUser',
        114: 'getCreateGameTemplateAttributesConfig',
        152: 'getGameListSnapshotSync',
        153: 'findDedicatedServers',
        171: 'reportTelemetry',
        172: 'addUsersToConnectionMetricAudit',
        173: 'removeUsersFromConnectionMetricAudit',
        174: 'fetchAuditedUsers',
        175: 'fetchAuditedUserData',
        176: 'deleteUserAuditMetricData',
        177: 'updatePrimaryExternalSessionForUser',
        178: 'getScenarioDetails',
        200: 'startPseudoMatchmakingScenario',
        201: 'updateExternalSessionImage',
        202: 'updateExternalSessionStatus',
        203: 'setUserScenarioVariant',
        204: 'getScenarioVariants',
        205: 'clearUserScenarioVariant',
        206: 'getTemplatesAndAttributes',
        207: 'getScenariosAndAttributes',
    },
    Message: {
        3: 'NotifyMatchmakingScenarioPseudoSuccess',
        10: 'NotifyMatchmakingFailed',
        11: 'NotifyMatchmakingSessionConnectionValidated',
        12: 'NotifyMatchmakingAsyncStatus',
        13: 'NotifyMatchmakingPseudoSuccess',
        14: 'NotifyRemoteMatchmakingStarted',
        15: 'NotifyRemoteMatchmakingEnded',
        16: 'NotifyGameRemoved',
        20: 'NotifyGameSetup',
        21: 'NotifyPlayerJoining',
        22: 'NotifyJoiningPlayerInitiateConnections',
        23: 'NotifyPlayerJoiningQueue',
        24: 'NotifyPlayerPromotedFromQueue',
        25: 'NotifyPlayerClaimingReservation',
        26: 'NotifyPlayerDemotedToQueue',
        30: 'NotifyPlayerJoinCompleted',
        40: 'NotifyPlayerRemoved',
        41: 'NotifyRemoteJoinFailed',
        60: 'NotifyHostMigrationFinished',
        70: 'NotifyHostMigrationStart',
        71: 'NotifyPlatformHostInitialized',
        80: 'NotifyGameAttribChange',
        81: 'NotifyDedicatedServerAttribChange',
        90: 'NotifyPlayerAttribChange',
        95: 'NotifyPlayerCustomDataChange',
        100: 'NotifyGameStateChange',
        110: 'NotifyGameSettingsChange',
        111: 'NotifyGameCapacityChange',
        112: 'NotifyGameReset',
        113: 'NotifyGameReportingIdChange',
        114: 'NotifyGamePresenceChanged',
        115: 'NotifyGameSessionUpdated',
        116: 'NotifyGamePlayerStateChange',
        117: 'NotifyGamePlayerTeamRoleSlotChange',
        118: 'NotifyGameTeamIdChange',
        119: 'NotifyProcessQueue',
        120: 'NotifyPresenceModeChanged',
        121: 'NotifyQueueChanged',
        123: 'NotifyGameModRegisterChanged',
        124: 'NotifyGameEntryCriteriaChanged',
        125: 'NotifyMatchmakingReservedExternalPlayers',
        135: 'NotifyHostedConnectivityAvailable',
        201: 'NotifyGameListUpdate',
        202: 'NotifyAdminListChange',
        230: 'NotifyGameNameChange',
        1016: 'NotifyGameRemoved',
        1020: 'NotifyGameSetup',
        1021: 'NotifyPlayerJoining',
        1022: 'NotifyJoiningPlayerInitiateConnections',
        1023: 'NotifyPlayerJoiningQueue',
        1024: 'NotifyPlayerPromotedFromQueue',
        1025: 'NotifyPlayerClaimingReservation',
        1026: 'NotifyPlayerDemotedToQueue',
        1030: 'NotifyPlayerJoinCompleted',
        1040: 'NotifyPlayerRemoved',
        1041: 'NotifyRemoteJoinFailed',
        1060: 'NotifyHostMigrationFinished',
        1070: 'NotifyHostMigrationStart',
        1071: 'NotifyPlatformHostInitialized',
        1080: 'NotifyGameAttribChange',
        1081: 'NotifyDedicatedServerAttribChange',
        1090: 'NotifyPlayerAttribChange',
        1095: 'NotifyPlayerCustomDataChange',
        1100: 'NotifyGameStateChange',
        1110: 'NotifyGameSettingsChange',
        1111: 'NotifyGameCapacityChange',
        1112: 'NotifyGameReset',
        1113: 'NotifyGameReportingIdChange',
        1114: 'NotifyGamePresenceChanged',
        1115: 'NotifyGameSessionUpdated',
        1116: 'NotifyGamePlayerStateChange',
        1117: 'NotifyGamePlayerTeamRoleSlotChange',
        1118: 'NotifyGameTeamIdChange',
        1119: 'NotifyProcessQueue',
        1120: 'NotifyPresenceModeChanged',
        1121: 'NotifyQueueChanged',
        1123: 'NotifyGameModRegisterChanged',
        1124: 'NotifyGameEntryCriteriaChanged',
        1202: 'NotifyAdminListChange',
        1230: 'NotifyGameNameChange',
        1240: 'NotifyMatchmakingFailed',
        1250: 'NotifyHostedConnectivityAvailable',
    },
    Error: {
        1: [
            'GAMEMANAGER_ERR_INVALID_GAME_SETTINGS',
            "A generic problem with the combination of game settings you're trying to use.  For example, you might be trying to change a game's ranked setting on the 360 after game creation (not allowed by XBL).",
        ],
        2: [
            'GAMEMANAGER_ERR_INVALID_GAME_ID',
            "The blazeServer wasn't able to find a game with the supplied gameId.",
        ],
        3: [
            'GAMEMANAGER_ERR_JOIN_METHOD_NOT_SUPPORTED',
            "The player's game join failed because the game doesn't allow players to join using the supplied JoinMethod.",
        ],
        4: [
            'GAMEMANAGER_ERR_PARTICIPANT_SLOTS_FULL',
            "The game doesn't have enough available participant slots. Note: If you need a public slot and none are available, you'll get PARTICIPANT_SLOTS_FULL, even if there are open private slots.",
        ],
        5: [
            'GAMEMANAGER_ERR_INVALID_GAME_STATE_TRANSITION',
            "The game refused to change state because it would violate the GameState state machine's allowed transitions.",
        ],
        6: [
            'GAMEMANAGER_ERR_INVALID_GAME_STATE_ACTION',
            'This RPC cannot be issued while the game is in its current state (GameState).',
        ],
        7: [
            'GAMEMANAGER_ERR_FAILED_IN_GAME_DESTROY',
            "System error: a game couldn't be destroyed for an unknown reason.",
        ],
        8: [
            'GAMEMANAGER_ERR_QUEUE_FULL',
            "The game is full, and there's not enough room in the game's queue for you (or your entire group would overflow the queue).",
        ],
        9: [
            'GAMEMANAGER_ERR_INVALID_GAME_ENTRY_CRITERIA',
            'The game failed to parse the game entry criteria.',
        ],
        10: [
            'GAMEMANAGER_ERR_GAME_PROTOCOL_VERSION_MISMATCH',
            'There was a mismatch in game protocol versions',
        ],
        11: [
            'GAMEMANAGER_ERR_GAME_IN_PROGRESS',
            'The game has already started, and does not allow join in progress.',
        ],
        12: [
            'GAMEMANAGER_ERR_RESERVED_GAME_ID_INVALID',
            "DEPRECATED - Reserved ids are only allowed if dynamically created dedicated server mode is enabled and the ID isn't already taken by an existing game.",
        ],
        13: [
            'GAMEMANAGER_ERR_INVALID_JOIN_METHOD',
            'The join method specified is not valid for the type of join attempted. System join methods not allowed, as well as specifying JOIN_BY_PLAYER with no player information(joinByGameId)',
        ],
        14: [
            'GAMEMANAGER_ERR_SLOT_OCCUPIED',
            'The requested slot was occupied- should only occur when attempting to join a specific slot in a game.',
        ],
        15: [
            'GAMEMANAGER_ERR_NOT_VIRTUAL_GAME',
            'The requested action can only be performed on a virtualized game.',
        ],
        16: [
            'GAMEMANAGER_ERR_NOT_TOPOLOGY_HOST',
            'The player requesting this action must be the topology host of the game.',
        ],
        17: [
            'GAMEMANAGER_ERR_TOPOLOGY_NOT_SUPPORTED',
            'The requested network topology is not supported by the game type.',
        ],
        18: [
            'GAMEMANAGER_ERR_GAME_BUSY',
            'The join cannot be completed while the game is in a busy GameState or locked as busy. Callers may try again later.',
        ],
        19: [
            'GAMEMANAGER_ERR_SESSION_TEMPLATE_NOT_SUPPORTED',
            'The requested external session template name is not supported by the server.',
        ],
        20: [
            'GAMEMANAGER_ERR_GAME_MODE_ATTRIBUTE_MISSING',
            "A game create or reset attempt didn't specify the game mode attribute.",
        ],
        21: [
            'GAMEMANAGER_ERR_FAILED_DUE_TO_FRIENDS_ONLY_RESTRICTION',
            "The game's join restrictions prevented the user from joining.",
        ],
        22: [
            'GAMEMANAGER_ERR_FAILED_DUE_TO_PRESENCE_MODE_RESTRICTION',
            "The game's presence mode prevented the user from joining.",
        ],
        23: [
            'GAMEMANAGER_ERR_SPECTATOR_SLOTS_FULL',
            "The game doesn't have enough available spectator slots. Note: If you need a public slot and none are available, you'll get SPECTATOR_SLOTS_FULL, even if there are open private slots.",
        ],
        24: [
            'GAMEMANAGER_ERR_UNRESPONSIVE_GAME_STATE',
            'This RPC cannot be issued while the game is in its current state (GameState == UNRESPONSIVE).',
        ],
        25: [
            'GAMEMANAGER_ERR_GAME_DESTROYED_BY_CONNECTION_UPDATE',
            'The game was destroyed by the connection update. This is not an unexpected error, but must be handled differently from a ERR_OK. (Pointers to the Game may be invalidated.)',
        ],
        26: [
            'GAMEMANAGER_ERR_INVALID_PING_SITE_ALIAS',
            'The ping site alias provided for the dedicated server game was invalid or unknown to QoS.',
        ],
        27: [
            'GAMEMANAGER_ERR_CROSSPLAY_DISABLED',
            'The crossplay settings of the Game or Request prevent the action from occurring.',
        ],
        28: [
            'GAMEMANAGER_ERR_CROSSPLAY_DISABLED_USER',
            'The crossplay settings of the User prevent the action from occurring.  Can be fixed by changing the Crossplay Enabled setting of the User.',
        ],
        29: [
            'GAMEMANAGER_ERR_UNEXPECTED_JOIN_FAILURE_GAME_VERSION',
            'Unexpected game record version detected while trying to join the game.',
        ],
        30: [
            'GAMEMANAGER_ERR_PERMISSION_DENIED',
            'You must have admin rights on the game to issue this RPC.',
        ],
        31: [
            'GAMEMANAGER_ERR_ALREADY_ADMIN',
            'A player to be added to admin list is already an admin.',
        ],
        32: [
            'GAMEMANAGER_ERR_NOT_IN_ADMIN_LIST',
            'A player to be removed from admin list is actually not an admin.',
        ],
        33: [
            'GAMEMANAGER_ERR_DEDICATED_SERVER_HOST',
            "A player to be removed from admin list is host of dedicated server, can't be removed.",
        ],
        50: [
            'GAMEMANAGER_ERR_INVALID_QUEUE_METHOD',
            'The server configured queueing method does not allow this call to be made.',
        ],
        51: [
            'GAMEMANAGER_ERR_PLAYER_NOT_IN_QUEUE',
            'The player that is being added to the game from the queue, is not currently in the queue.',
        ],
        52: [
            'GAMEMANAGER_ERR_DEQUEUE_WHILE_MIGRATING',
            'The server will not process a queued player while the game is migrating.  This is because the player will then fail to establish network connecitons.',
        ],
        53: [
            'GAMEMANAGER_ERR_DEQUEUE_WHILE_IN_PROGRESS',
            'The server will not process a queued player while the game is in progress and in progress joins are not allowed.',
        ],
        101: [
            'GAMEMANAGER_ERR_PLAYER_NOT_FOUND',
            "The player wasn't found in a game, or the player may not exist at all (Note: we don't hit the user DB to validate a user's existence).",
        ],
        103: [
            'GAMEMANAGER_ERR_ALREADY_GAME_MEMBER',
            "The player can't join the game; he's already a game member",
        ],
        104: [
            'GAMEMANAGER_ERR_REMOVE_PLAYER_FAILED',
            "System Error: a player was banned from the game, but couldn't be removed.",
        ],
        107: [
            'GAMEMANAGER_ERR_INVALID_PLAYER_PASSEDIN',
            'Attempting to take an action on an existing (but invalid) player.  For example, banning or kicking yourself out of a game.',
        ],
        108: [
            'GAMEMANAGER_ERR_JOIN_PLAYER_FAILED',
            "A Dedicated server reset attempt failed because we couldn't join the game after resetting it.",
        ],
        109: [
            'GAMEMANAGER_ERR_MISSING_PRIMARY_LOCAL_PLAYER',
            'The primry local player is not fully in game, so the other local users cannot join.',
        ],
        110: [
            'GAMEMANAGER_ERR_PLAYER_BANNED',
            "The player's joinGame failed; he's been banned from this game.",
        ],
        111: [
            'GAMEMANAGER_ERR_GAME_ENTRY_CRITERIA_FAILED',
            "The player's joinGame failed; he doesn't satisfy the game's EntryCriteria formula.  See the JoinGameCb's entry criteria string for details.",
        ],
        112: [
            'GAMEMANAGER_ERR_ALREADY_IN_QUEUE',
            "The player can't join the game; they are already in the queue.",
        ],
        113: [
            'GAMEMANAGER_ERR_ENFORCING_SINGLE_GROUP_JOINS',
            "The player can't join the game; the game's GameSettings::setEnforceSingleGroupJoin flag is set and the game already has 2 game groups in it.",
        ],
        114: [
            'GAMEMANAGER_ERR_BANNED_PLAYER_NOT_FOUND',
            "The player isn't found in the banned list of the game, remove the banned player failure.",
        ],
        115: [
            'GAMEMANAGER_ERR_BANNED_LIST_MAX',
            'The banned players have exceed the max banned users numable that setting at configuration file.',
        ],
        117: [
            'GAMEMANAGER_ERR_FAILED_REPUTATION_CHECK',
            "The player failed to pass the reputation check on a game that doesn't allow any reputation value.",
        ],
        120: [
            'GAMEMANAGER_ERR_RESERVATION_ALREADY_EXISTS',
            'The player cannot make a reservation for a game they already have a reservation in.',
        ],
        121: [
            'GAMEMANAGER_ERR_NO_RESERVATION_FOUND',
            'The player can only claim reservations in a game in which they have made a reservation.',
        ],
        122: [
            'GAMEMANAGER_ERR_INVALID_GAME_ENTRY_TYPE',
            'The type of entry requested is not valid for the join method.  Matchmaking does not allow claiming reservations.',
        ],
        151: [
            'GAMEMANAGER_ERR_INVALID_GROUP_ID',
            "The blazeServer wasn't able to find a user group with the supplied id.",
        ],
        152: [
            'GAMEMANAGER_ERR_PLAYER_NOT_IN_GROUP',
            'The player is not a member of the specified group.',
        ],
        200: [
            'GAMEMANAGER_ERR_INVALID_MATCHMAKING_CRITERIA',
            "Problem parsing your matchmaking criteria.  See StartMatchmakingError's err msg for details.",
        ],
        201: [
            'GAMEMANAGER_ERR_UNKNOWN_MATCHMAKING_SESSION_ID',
            'No matchmaking sessions exist with the id you specified.',
        ],
        202: [
            'GAMEMANAGER_ERR_NOT_MATCHMAKING_SESSION_OWNER',
            'You can only cancel matchmaking sessions that you are the owner of.',
        ],
        203: [
            'GAMEMANAGER_ERR_MATCHMAKING_NO_JOINABLE_GAMES',
            'None of the games provided from find game matchmaking were joinable.',
        ],
        205: [
            'GAMEMANAGER_ERR_MATCHMAKING_USERSESSION_NOT_FOUND',
            'The owning user session for the session was not found.',
        ],
        206: [
            'GAMEMANAGER_ERR_MATCHMAKING_EXCEEDED_MAX_REQUESTS',
            'The number of concurrent active matchmaking sessions exceeded configured maximum.',
        ],
        207: [
            'GAMEMANAGER_ERR_MATCHMAKING_USER_GROUP_EXCEEDED_MAX_REQUESTS',
            'The number of concurrent active user group matchmaking sessions exceeded configured maximum.',
        ],
        230: [
            'GAMEMANAGER_ERR_PLAYER_CAPACITY_TOO_SMALL',
            "The capacity changes are invalid, it's less than current players count of the game, or the minimum capacity.",
        ],
        231: [
            'GAMEMANAGER_ERR_PLAYER_CAPACITY_TOO_LARGE',
            "The capacity changes are invalid, it's above the maximum players capacity of the game.",
        ],
        232: [
            'GAMEMANAGER_ERR_PLAYER_CAPACITY_IS_ZERO',
            "The capacity changes are invalid, the total participant count can't be 0.",
        ],
        233: [
            'GAMEMANAGER_ERR_MAX_PLAYER_CAPACITY_TOO_LARGE',
            'The blazeServer has a compile-time limit of SLOT_ID_MAX_COUNT players in a game (256 by default).  See gamesessionmaster.h on the server.',
        ],
        250: [
            'GAMEMANAGER_ERR_INVALID_TEAM_CAPACITIES_VECTOR_SIZE',
            'A game must have 1 or more teams specified.',
        ],
        251: [
            'GAMEMANAGER_ERR_DUPLICATE_TEAM_CAPACITY',
            'vector contains multiple nodes for a single teamId.',
        ],
        252: [
            'GAMEMANAGER_ERR_INVALID_TEAM_ID_IN_TEAM_CAPACITIES_VECTOR',
            'INVALID_TEAM_ID is reserved, and cannot be used in the team capacities vector.',
        ],
        253: [
            'GAMEMANAGER_ERR_TEAM_NOT_ALLOWED',
            "trying to perform a team operation on a game or player for a team that isn't allowed (not present in capacity vector)",
        ],
        254: [
            'GAMEMANAGER_ERR_TOTAL_TEAM_CAPACITY_INVALID',
            "sum of all teams is not equal to the game's total capacity.",
        ],
        255: [
            'GAMEMANAGER_ERR_TEAM_FULL',
            'trying to join a full team, or a team that you cannot fit your entire game group into.',
        ],
        257: [
            'GAMEMANAGER_ERR_PLAYER_CAPACITY_NOT_EVENLY_DIVISIBLE_BY_TEAMS',
            "A game's total player capacity must be evenly divisible amongst the teams present in the game.",
        ],
        270: [
            'GAMEMANAGER_ERR_EMPTY_ROLE_CAPACITIES',
            'Role capacities were empty.',
        ],
        271: [
            'GAMEMANAGER_ERR_ROLE_CAPACITY_TOO_SMALL',
            'Sum of role capacities were too small to complete a team.',
        ],
        272: [
            'GAMEMANAGER_ERR_ROLE_CAPACITY_TOO_LARGE',
            "A role's capacity was specified as larger than the game's team capacity.",
        ],
        273: [
            'GAMEMANAGER_ERR_ROLE_NOT_ALLOWED',
            'Operation on a role not present in the game.',
        ],
        274: [
            'GAMEMANAGER_ERR_ROLE_FULL',
            'The selected role is full.',
        ],
        275: [
            'GAMEMANAGER_ERR_ROLE_CRITERIA_INVALID',
            'The game failed to parse the role criteria.',
        ],
        276: [
            'GAMEMANAGER_ERR_ROLE_CRITERIA_FAILED',
            "The player's joinGame failed; he doesn't satisfy the game's RoleCriteria formula.  See the JoinGameCb's entry criteria string for details.",
        ],
        277: [
            'GAMEMANAGER_ERR_MULTI_ROLE_CRITERIA_INVALID',
            'The game failed to parse the multirole criteria.',
        ],
        278: [
            'GAMEMANAGER_ERR_MULTI_ROLE_CRITERIA_FAILED',
            "The player's joinGame failed; he doesn't satisfy the game's MultiRoleCriteria formula.",
        ],
        301: [
            'GAMEMANAGER_ERR_NO_DEDICATED_SERVER_FOUND',
            'No dedicated game servers were found (none are available to reset).',
        ],
        302: [
            'GAMEMANAGER_ERR_DEDICATED_SERVER_ONLY_ACTION',
            'An invalid action was attempted, this action is only available for dedicated server network topology',
        ],
        303: [
            'GAMEMANAGER_ERR_DEDICATED_SERVER_HOST_CANNOT_JOIN',
            "Host can't join his own dedicated server game.",
        ],
        304: [
            'GAMEMANGER_ERR_MACHINE_ID_LIST_EMPTY',
            'A dynamic dedicated server creator attempted to register itself with no machine ids provided',
        ],
        308: [
            'GAMEMANAGER_ERR_NO_HOSTS_AVAILABLE_FOR_INJECTION',
            "Virtual game materialization failed because suitable dedicated server for game injection wasn't found.",
        ],
        401: [
            'GAMEBROWSER_ERR_INVALID_CRITERIA',
            "Problem parsing your game browsing criteria.  See GetGameListError's err msg for details.",
        ],
        402: [
            'GAMEBROWSER_ERR_INVALID_CAPACITY',
            "A list's capacity must be GAME_LIST_CAPACITY_UNLIMITED, or greater than zero.",
        ],
        403: [
            'GAMEBROWSER_ERR_INVALID_LIST_ID',
            'No list subscription found on the blazeServer with the supplied id.',
        ],
        404: [
            'GAMEBROWSER_ERR_NOT_LIST_OWNER',
            'This operation can only be completed by the list owner.',
        ],
        405: [
            'GAMEBROWSER_ERR_INVALID_LIST_CONFIG_NAME',
            "The gameBrowser can't find a list configuration with the supplied listConfigName.  (list configurations are defined in the server's gamebrowser config file).",
        ],
        406: [
            'GAMEBROWSER_ERR_CANNOT_GET_USERSET',
            'Cannot get user set from userset provider',
        ],
        407: [
            'GAMEBROWSER_ERR_EXCEED_MAX_SYNC_SIZE',
            'Cannot get games exceed max size set based on configs maxGameListSyncSize',
        ],
        408: [
            'GAMEBROWSER_ERR_EXCEEDED_MAX_REQUESTS',
            'The number of concurrent active game browser lists exceeded configured maximum.',
        ],
        409: [
            'GAMEBROWSER_ERR_SEARCH_ERR_OVERLOADED',
            'The search slave is overloaded.',
        ],
        410: [
            'GAMEBROWSER_ERR_CROSS_PLATFORM_OPTOUT',
            'Action not allowed for user opted-out of cross platform.',
        ],
        411: [
            'GAMEBROWSER_ERR_DISALLOWED_PLATFORM',
            'The action requested required a disallowed cross platform interaction.',
        ],
        502: [
            'GAMEMANAGER_ERR_GAME_CAPACITY_TOO_SMALL',
            'In valid game capacity settings, the desired capacity of the game to be created is less than the number of people that need to join the game.',
        ],
        503: [
            'GAMEMANAGER_ERR_INVALID_ACTION_FOR_GROUP',
            'An invalid action was attempted, this action is only available for individual player instead of a group.',
        ],
        505: [
            'GAMEMANAGER_ERR_MIGRATION_NOT_SUPPORTED',
            'An attempt to initiate host migration has occured on a game that does not support host migration.',
        ],
        506: [
            'GAMEMANAGER_ERR_INVALID_NEWHOST',
            'Suggested new host is a invalid candidate for host migration.',
        ],
        508: [
            'GAMEMANAGER_ERR_INVALID_PERSISTED_GAME_ID_OR_SECRET',
            'The secret does not match with the guid.',
        ],
        509: [
            'GAMEMANAGER_ERR_PERSISTED_GAME_ID_IN_USE',
            'The persisted game id is in use.',
        ],
        510: [
            'GAMEMANAGER_ERR_USER_NOT_FOUND',
        ],
        511: [
            'GAMEMANAGER_ERR_USER_ALREADY_AUDITED',
        ],
        512: [
            'GAMEMANAGER_ERR_USER_CURRENTLY_AUDITED',
        ],
        600: [
            'GAMEMANAGER_ERR_INVALID_SCENARIO_NAME',
            'The scenario name provided does not exist.',
        ],
        601: [
            'GAMEMANAGER_ERR_INVALID_SCENARIO_ID',
            'The scenario id provided is invalid, or no longer exists.',
        ],
        602: [
            'GAMEMANAGER_ERR_NOT_SCENARIO_OWNER',
            'Attempting to perform an action on a scenario not owned by the current user.',
        ],
        603: [
            'GAMEMANAGER_ERR_MISSING_SCENARIO_ATTRIBUTE',
            'The Scenario being run requires an attribute that was not provided.',
        ],
        604: [
            'GAMEMANAGER_ERR_INVALID_SCENARIO_ATTRIBUTE',
            'A Scenario Attribute being used is currently invalid. (Generally indicates a config setup error.)',
        ],
        605: [
            'GAMEMANAGER_ERR_INVALID_SCENARIO_VARIANT',
            'The Scenario variant being used is currently invalid.',
        ],
        610: [
            'GAMEMANAGER_ERR_INVALID_TEMPLATE_NAME',
            'The RPC template name provided does not exist.',
        ],
        611: [
            'GAMEMANAGER_ERR_MISSING_TEMPLATE_ATTRIBUTE',
            'The template being run requires an attribute that was not provided.',
        ],
        612: [
            'GAMEMANAGER_ERR_INVALID_TEMPLATE_ATTRIBUTE',
            'A template Attribute being used is currently invalid. (Generally indicates a config setup error.)',
        ],
        620: [
            'GAMEMANAGER_ERR_INPUT_SANITIZER_FAILURE',
            'The Input Sanitizer failed due to incorrect formatting or criteria failure.',
        ],
        700: [
            'GAMEMANAGER_ERR_EXTERNAL_SERVICE_BUSY',
            "The number of calls by the user for has exceeded the command's rate limit.",
        ],
        701: [
            'GAMEMANAGER_ERR_EXTERNAL_SESSION_IMAGE_INVALID',
            'The image for the external session is invalid or missing.',
        ],
        702: [
            'GAMEMANAGER_ERR_EXTERNAL_SESSION_CUSTOM_DATA_TOO_LARGE',
            'The custom data for the external session is too large.',
        ],
        703: [
            'GAMEMANAGER_ERR_EXTERNAL_SESSION_ERROR',
            'General error returned when the external session service returns an unhandled error.',
        ],
        704: [
            'GAMEMANAGER_ERR_EXTERNALSESSION_INVALID_SANDBOX_ID',
            'The external session has invalid sandbox id.',
        ],
    },
};

const Redirector = {
    Command: {
        1: 'getServerInstance',
        7: 'getServerAddressMap',
        9: 'getCACertificates',
        10: 'findCACertificates',
        11: 'publishServerInstanceInfo',
        12: 'updateServerInstanceInfo',
        14: 'getPeerServerAddress',
        15: 'getCAResolverMetrics',
        16: 'purgeServerRegistration',
        17: 'getServerInstanceHttp',
    },
    Error: {
        1: [
            'REDIRECTOR_SERVER_NOT_FOUND',
            'No Blaze cluster found matching the requested service name (getServerInstance/getServerInstanceHttp calls only)',
        ],
        2: [
            'REDIRECTOR_NO_SERVER_CAPACITY',
            'All endpoints matching the requested service name and connection profile have reached their connection limit (or are draining)',
        ],
        3: [
            'REDIRECTOR_NO_MATCHING_INSTANCE',
            'No endpoints found matching the requested service name and connection profile',
        ],
        4: [
            'REDIRECTOR_SERVER_NAME_ALREADY_IN_USE',
            '(updateServerInfo/publishServerInstanceInfo calls only) A Blaze instance with the same instance id is already registered (under a different registration id) for the specified service name',
        ],
        5: [
            'REDIRECTOR_CLIENT_NOT_COMPATIBLE',
            "The client is incompatible with the Blaze cluster matching the requested service name (the client version is in the cluster's configured list of incompatible client versions)",
        ],
        6: [
            'REDIRECTOR_CLIENT_UNKNOWN',
            "The client version is not recognized by the Blaze cluster matching the requested service name (the client version is not in the cluster's configured lists of compatible or incompatible client versions, and the cluster's list of compatible client versions is non-empty)",
        ],
        7: [
            'REDIRECTOR_UNKNOWN_CONNECTION_PROFILE',
            "The requested connection profile is not in the redirector's configured list of profiles",
        ],
        8: [
            'REDIRECTOR_SERVER_SUNSET',
            'The requested service name has been sunset',
        ],
        9: [
            'REDIRECTOR_SERVER_DOWN',
            'The REDIRECTOR_SERVER_DOWN error code is no longer in use',
        ],
        10: [
            'REDIRECTOR_INVALID_PARAMETER',
            'The REDIRECTOR_INVALID_PARAMETER error code is no longer in use',
        ],
        11: [
            'REDIRECTOR_UNKNOWN_SERVICE_NAME',
            'No Blaze cluster found matching the requested service name (scheduleServerDowntime calls only)',
        ],
        12: [
            'REDIRECTOR_PAST_EVENT',
            '(scheduleServerDowntime calls only) The downtime being scheduled has already begun',
        ],
        13: [
            'REDIRECTOR_UNKNOWN_SCHEDULE_ID',
            '(cancelServerDowntime calls only) No scheduled downtime found matching the requested id',
        ],
        14: [
            'REDIRECTOR_MISSING_SERVICE_NAME',
            '(findCACertificates calls only) Request specified a DirtyCert version without providing a service name',
        ],
    },
};

const Stats = {
    Command: {
        1: 'getStatDescs',
        2: 'getStats',
        3: 'getStatGroupList',
        4: 'getStatGroup',
        5: 'getStatsByGroup',
        6: 'getDateRange',
        7: 'getEntityCount',
        8: 'updateStats',
        9: 'wipeStats',
        10: 'getLeaderboardGroup',
        11: 'getLeaderboardFolderGroup',
        12: 'getLeaderboard',
        13: 'getCenteredLeaderboard',
        14: 'getFilteredLeaderboard',
        15: 'getKeyScopesMap',
        16: 'getStatsByGroupAsync',
        162: 'getStatsByGroupAsync2',
        17: 'getLeaderboardTreeAsync',
        172: 'getLeaderboardTreeAsync2',
        18: 'getLeaderboardEntityCount',
        19: 'getStatCategoryList',
        20: 'getPeriodIds',
        21: 'getLeaderboardRaw',
        212: 'getLeaderboardRaw2',
        22: 'getCenteredLeaderboardRaw',
        222: 'getCenteredLeaderboardRaw2',
        23: 'getFilteredLeaderboardRaw',
        232: 'getFilteredLeaderboardRaw2',
        24: 'changeKeyscopeValue',
        25: 'getEntityRank',
        26: 'initializeStatsTransaction',
        27: 'commitStatsTransaction',
        28: 'abortStatsTransaction',
        29: 'calcDerivedStats',
        30: 'retrieveValuesStats',
    },
    Message: {
        1: 'UpdateCacheNotification',
        2: 'UpdateGlobalStatsNotification',
        50: 'GetStatsAsyncNotification',
        51: 'GetLeaderboardTreeNotification',
    },
    Error: {
        1: [
            'STATS_ERR_CONFIG_NOTAVAILABLE',
            'Config data is not loaded',
        ],
        2: [
            'STATS_ERR_INVALID_LEADERBOARD_ID',
            'Invalid leaderboard ID',
        ],
        3: [
            'STATS_ERR_INVALID_FOLDER_ID',
            'Invalid leaderboard folder ID',
        ],
        4: [
            'STATS_ERR_UNKNOWN_CATEGORY',
            'Unknown category was requested',
        ],
        5: [
            'STATS_ERR_STAT_NOT_FOUND',
            'Stat not found',
        ],
        6: [
            'STATS_ERR_BAD_PERIOD_TYPE',
            'Bad period type',
        ],
        7: [
            'STATS_ERR_NO_DB_CONNECTION',
            'Failed to obtain DB connection',
        ],
        8: [
            'STATS_ERR_DB_DATA_NOT_AVAILABLE',
            'No data returned by DB',
        ],
        9: [
            'STATS_ERR_UNKNOWN_STAT_GROUP',
            'Unknown stat group',
        ],
        10: [
            'STATS_ERR_DB_TRANSACTION_ERROR',
            'Unsuccessful DB transaction',
        ],
        11: [
            'STATS_ERR_INVALID_UPDATE_TYPE',
            'Invalid update type',
        ],
        13: [
            'STATS_ERR_DB_QUERY_FAILED',
            'DB query select failed',
        ],
        14: [
            'STATS_ERR_RANK_OUT_OF_RANGE',
            'Rank out of range',
        ],
        15: [
            'STATS_ERR_BAD_PERIOD_OFFSET',
            'Bad period offset',
        ],
        16: [
            'STATS_ERR_BAD_SCOPE_INFO',
            'Scope defination is not right.',
        ],
        17: [
            'STATS_ERR_INVALID_FOLDER_NAME',
            'Requested folder is not found.',
        ],
        18: [
            'STATS_ERR_OPERATION_IN_PROGRESS',
            'Requested operation is already in progress.',
        ],
        20: [
            'STATS_ERR_INVALID_OPERATION',
            'Requested operation is not defined',
        ],
        21: [
            'STATS_ERR_INVALID_OBJECT_ID',
            'Invalid object ID is supplied',
        ],
        22: [
            'STATS_ERR_BAD_PERIOD_COUNTER',
            'Invalid period counter is supplied',
        ],
        23: [
            'STATS_ERR_LEADERBOARD_NOT_IN_MEMORY',
            'Leaderboard is not in the memory',
        ],
    },
};

const Util = {
    Command: {
        1: 'fetchClientConfig',
        2: 'ping',
        3: 'setClientData',
        4: 'localizeStrings',
        5: 'getTelemetryServer',
        6: 'getTickerServer',
        7: 'preAuth',
        8: 'postAuth',
        10: 'userSettingsLoad',
        11: 'userSettingsSave',
        12: 'userSettingsLoadAll',
        13: 'userSettingsLoadAllForUserId',
        14: 'deleteUserSettings',
        15: 'userSettingsLoadMultiple',
        20: 'filterForProfanity',
        21: 'setClientMetrics',
        23: 'setConnectionState',
        25: 'getUserOptions',
        26: 'setUserOptions',
        27: 'suspendUserPing',
        28: 'setClientState',
        29: 'setClientUserMetrics',
    },
    Error: {
        100: [
            'UTIL_CONFIG_NOT_FOUND',
            'config section not found',
        ],
        101: [
            'UTIL_PSU_LIMIT_EXCEEDED',
            'PSU limit reached',
        ],
        102: [
            'UTIL_SERVICENAME_NOT_SPECIFIED',
            'Caller did not specify a service name. Required for shared platforms cluster.',
        ],
        103: [
            'UTIL_SERVICENAME_NOT_HOSTED',
            'Caller specified service name is not hosted on this instance.',
        ],
        104: [
            'UTIL_CALLER_PLATFORM_NOT_FOUND',
            "caller's platform is not available.",
        ],
        105: [
            'UTIL_CALLER_PLATFORM_MISMATCH',
            'caller is attempting to access a resource for a different platform. Explicit error mostly to assist debugging.',
        ],
        106: [
            'UTIL_CALLER_PLATFORM_NOT_ALLOWED',
            'caller is attempting to access a service it should not. Explicit error mostly to assist debugging.',
        ],
        150: [
            'UTIL_TELEMETRY_NO_SERVERS_AVAILABLE',
            'There are no telemetry servers available',
        ],
        151: [
            'UTIL_TELEMETRY_OUT_OF_MEMORY',
            'Server is out of memory.',
        ],
        152: [
            'UTIL_TELEMETRY_KEY_TOO_LONG',
            'Telemetry key is longer then it should be.',
        ],
        155: [
            'UTIL_TICKER_NO_SERVERS_AVAILABLE',
            'There are no ticker servers available.',
        ],
        156: [
            'UTIL_TICKER_KEY_TOO_LONG',
            'Ticker key is too long to create.',
        ],
        200: [
            'UTIL_USS_RECORD_NOT_FOUND',
            'Record not found in user small storage.',
        ],
        201: [
            'UTIL_USS_TOO_MANY_KEYS',
            'Exceeded number of keys allowed for user.',
        ],
        202: [
            'UTIL_USS_DB_ERROR',
            'Database error while reading/writing.',
        ],
        250: [
            'UTIL_USS_USER_NO_EXTENDED_DATA',
            'There is no extended data for the given session.',
        ],
        300: [
            'UTIL_SUSPEND_PING_TIME_TOO_LARGE',
            'Requested Ping Suspension time exceeds maximum configured time.',
        ],
        301: [
            'UTIL_SUSPEND_PING_TIME_TOO_SMALL',
            'Requested Ping Suspension time is less than the minimum time allowed for a connection (has to be greater than inactivityTimeout on the BlazeServer).',
        ],
    },
};

const Messaging = {
    Command: {
        1: 'sendMessage',
        2: 'fetchMessages',
        3: 'purgeMessages',
        4: 'touchMessages',
        5: 'getMessages',
        6: 'sendSourceMessage',
        7: 'sendGlobalMessage',
    },
    Message: {
        1: 'NotifyMessage',
    },
    Error: {
        1: [
            'MESSAGING_ERR_UNKNOWN',
            'Unknown error occurred.',
        ],
        2: [
            'MESSAGING_ERR_MAX_ATTR_EXCEEDED',
            'Exceeded maximum number of message attributes.',
        ],
        3: [
            'MESSAGING_ERR_DATABASE',
            'Messaging database error.',
        ],
        4: [
            'MESSAGING_ERR_TARGET_NOT_FOUND',
            'Message target not found.',
        ],
        5: [
            'MESSAGING_ERR_TARGET_TYPE_INVALID',
            'Message target type is invalid.',
        ],
        6: [
            'MESSAGING_ERR_TARGET_INBOX_FULL',
            'Target message inbox is full.',
        ],
        7: [
            'MESSAGING_ERR_MATCH_NOT_FOUND',
            'Match not found.',
        ],
        8: [
            'MESSAGING_ERR_FEATURE_DISABLED',
            'Feature is disabled on the messaging server.',
        ],
        9: [
            'MESSAGING_ERR_INVALID_PARAM',
            'Invalid parameter(s).',
        ],
        10: [
            'MESSAGING_ERR_PROFANITY_SYSTEM',
            'Message was tagged for profanity filtering but the profanity service returned an error. Message will not be delivered.',
        ],
    },
};

const AssociationLists = {
    Command: {
        1: 'addUsersToList',
        2: 'removeUsersFromList',
        3: 'clearLists',
        4: 'setUsersToList',
        5: 'getListForUser',
        6: 'getLists',
        7: 'subscribeToLists',
        8: 'unsubscribeFromLists',
        9: 'getConfigListsInfo',
        10: 'getMemberHash',
        11: 'checkListMembership',
        12: 'checkListContainsMembers',
        13: 'setUsersAttributesInList',
    },
    Error: {
        1: [
            'ASSOCIATIONLIST_ERR_USER_NOT_FOUND',
            'The referenced user was not found.',
        ],
        2: [
            'ASSOCIATIONLIST_ERR_DUPLICATE_USER_FOUND',
            'Duplicate ListMemberIds were found from the UpdateListMembersRequest.',
        ],
        3: [
            'ASSOCIATIONLIST_ERR_CANNOT_INCLUDE_SELF',
            'User cannot include themselves in a UpdateListMembersRequest.',
        ],
        4: [
            'ASSOCIATIONLIST_ERR_INVALID_USER',
            'A ListMemberId in the request is invalid. The blaze id, external id, and persona are all invalid.',
        ],
        5: [
            'ASSOCIATIONLIST_ERR_MEMBER_ALREADY_IN_THE_LIST',
            'Some members in the UpdateListMembersRequest are already in the association list.',
        ],
        6: [
            'ASSOCIATIONLIST_ERR_MEMBER_NOT_FOUND_IN_THE_LIST',
            'Some members in the UpdateListMembersRequest were not found in the association list.',
        ],
        10: [
            'ASSOCIATIONLIST_ERR_LIST_NOT_FOUND',
            'Specified list does not exist or no list is specified.',
        ],
        11: [
            'ASSOCIATIONLIST_ERR_LIST_IS_FULL_OR_TOO_MANY_USERS',
            "List is already full, can't add other members, or members in the list to be added are too many for the list max size. Used when FIFO for list is false",
        ],
        16: [
            'ASSOCIATIONLIST_ERR_PAIRED_LIST_MODIFICATION_NOT_SUPPORTED',
            'User can not modify the Paired list(add/remove members) directly.',
        ],
        17: [
            'ASSOCIATIONLIST_ERR_PAIRED_LIST_IS_FULL_OR_TOO_MANY_USERS',
            'Paired list is already full.',
        ],
        18: [
            'ASSOCIATIONLIST_ERR_SUBSCRIBE_USER_LIST_NOT_SUPPORTED',
            "Requestor can not subscribe/unsubscribe another user's list.",
        ],
    },
};

const GameReporting = {
    Command: {
        1: 'submitGameReport',
        100: 'submitTrustedMidGameReport',
        101: 'submitTrustedEndGameReport',
        2: 'submitOfflineGameReport',
        3: 'submitGameEvents',
        4: 'getGameReportQuery',
        5: 'getGameReportQueriesList',
        6: 'getGameReports',
        7: 'getGameReportView',
        8: 'getGameReportViewInfo',
        9: 'getGameReportViewInfoList',
        10: 'getGameReportTypes',
        11: 'updateMetric',
        12: 'getGameReportColumnInfo',
        13: 'getGameReportColumnValues',
        14: 'getTournamentGameReportView',
        200: 'gameStarted',
        201: 'gameFinished',
    },
    Error: {
        1: [
            'GAMEREPORTING_ERR_UNEXPECTED_REPORT',
        ],
        100: [
            'GAMEREPORTING_COLLATION_ERR_NO_VALID_REPORTS',
        ],
        101: [
            'GAMEREPORTING_COLLATION_ERR_NO_REPORTS',
        ],
        102: [
            'GAMEREPORTING_COLLATION_REPORTS_INCONSISTENT',
        ],
        103: [
            'GAMEREPORTING_COLLATION_ERR_MISSING_GAME_ATTRIBUTE',
        ],
        104: [
            'GAMEREPORTING_COLLATION_ERR_INVALID_GAME_ATTRIBUTE',
        ],
        200: [
            'GAMEREPORTING_CUSTOM_ERR_PROCESSING_FAILED',
        ],
        201: [
            'GAMEREPORTING_CONFIG_ERR_MISSING_PROCESSOR_ATTRIBUTE',
        ],
        202: [
            'GAMEREPORTING_CONFIG_ERR_INVALID_PROCESSOR_ATTRIBUTE',
        ],
        203: [
            'GAMEREPORTING_CONFIG_ERR_STAT_UPDATE_FAILED',
        ],
        204: [
            'GAMEREPORTING_CUSTOM_ERR_PROCESS_UPDATED_STATS_FAILED',
        ],
        205: [
            'GAMEREPORTING_ERR_INVALID_GAME_TYPE',
        ],
        301: [
            'GAMEREPORTING_OFFLINE_ERR_INVALID_GAME_TYPE',
        ],
        302: [
            'GAMEREPORTING_OFFLINE_ERR_REPORT_INVALID',
        ],
        401: [
            'GAMEREPORTING_TRUSTED_ERR_INVALID_GAME_TYPE',
        ],
        402: [
            'GAMEREPORTING_TRUSTED_ERR_REPORT_INVALID',
        ],
        501: [
            'GAMEHISTORY_ERR_UNKNOWN_QUERY',
            'Game report query requested is not defined.',
        ],
        502: [
            'GAMEHISTORY_ERR_INVALID_COLUMNKEY',
            'Game report query requested is not defined.',
        ],
        503: [
            'GAMEHISTORY_ERR_INVALID_FILTER',
            'Game report query requested is not defined.',
        ],
        504: [
            'GAMEHISTORY_ERR_INVALID_GAMETYPE',
            'Game report query requested is not defined.',
        ],
        505: [
            'GAMEHISTORY_ERR_UNKNOWN_VIEW',
            'Game report view requested is not defined.',
        ],
        506: [
            'GAMEHISTORY_ERR_INVALID_QUERY',
            'Game report query requested is invalid.',
        ],
        507: [
            'GAMEHISTORY_ERR_MISSING_QVARS',
            'Query variables are needed but not provided.',
        ],
        508: [
            'GAMEHISTORY_ERR_INVALID_QVARS',
            'Query variables provided are invalid.',
        ],
    },
};

const Matchmaker = {
    Command: {
        1: 'startMatchmakingInternal',
        2: 'cancelMatchmakingInternal',
        10: 'getMatchmakingConfig',
        11: 'getMatchmakingInstanceStatus',
        33: 'matchmakingDedicatedServerOverride',
        34: 'getMatchmakingDedicatedServerOverrides',
        35: 'matchmakingFillServersOverride',
        36: 'getMatchmakingFillServersOverride',
        41: 'gameSessionConnectionComplete',
        42: 'getMatchmakingMetrics',
    },
};

const Achievements = {
    Command: {
        1: 'getAchievements',
        3: 'grantAchievement',
        6: 'postEvents',
    },
};

const Friends = {
    Command: {
        1: 'muteUser',
        2: 'checkMuteStatus',
        3: 'unmuteUser',
    },
    Error: {
        504: [
            'FRIENDS_UNKNOWN_ERR',
            'An unknown error occurred within the server',
        ],
        11100: [
            'FRIENDS_API_KEY_INVALID',
            'Requires API Key or Client Certificate',
        ],
        901: [
            'FRIENDS_NO_SUCH_USER',
            'Unable to locate a user with the specified ID',
        ],
        909: [
            'FRIENDS_INVALID_ARGUMENT_TYPE',
            'Invalid type',
        ],
        20006: [
            'FRIENDS_NO_ID_SPECIFIED',
            'Neither a Nucleus ID nor a Persona ID were passed to a method that expected one',
        ],
        20007: [
            'FRIENDS_NO_FRIEND_SPECIFIED',
            'No friend ID was specified',
        ],
        20008: [
            'FRIENDS_BAD_PRIVACY_SETTING',
            'An invalid privacy setting was specified',
        ],
        22001: [
            'FRIENDS_FRIENDS_LIST_FULL',
            "The inviter or invitee's friends list is at or above the limit",
        ],
        22002: [
            'FRIENDS_NO_GROUP_NAME_SPECIFIED',
            'No group name was specified when trying to remove a user from a group',
        ],
        22003: [
            'FRIENDS_GLOBAL_GROUP_LOCKED',
            'Can not remove a user from the global group',
        ],
        22004: [
            'FRIENDS_AUTHTOKEN_INVALID',
            'The AuthToken in the request is invalid',
        ],
        22005: [
            'FRIENDS_AUTHTOKEN_INVALID_FOR_USER',
            'The AuthToken does not match the Nucleus ID',
        ],
        22006: [
            'FRIENDS_INVITATION_NOT_FOUND',
            'The specified invitation was not found',
        ],
        22007: [
            'FRIENDS_TARGET_NOT_FRIEND',
            'The target user is not a friend',
        ],
        22008: [
            'FRIENDS_TARGET_IN_CUSTOM_GROUP',
            'The target user is in a non-default group and must be removed',
        ],
        22009: [
            'FRIENDS_INVITEE_BLOCKED_BY_INVITER',
            "The invitee is in the inviter's block list",
        ],
        22010: [
            'FRIENDS_INVITEE_ALREADY_FRIEND',
            "The invitee is already in the inviter's friend list",
        ],
        22013: [
            'FRIENDS_FRIEND_NOT_IN_GROUP',
            "The friend isn't in the specified group",
        ],
        22015: [
            'FRIENDS_BLOCKING_SELF',
            'The user is trying to block their own ID',
        ],
        22016: [
            'FRIENDS_BATCH_INVITE_ERROR',
            'An error was encountered while doing a batch invite operation',
        ],
        22017: [
            'FRIENDS_INVITEE_IS_INVITER',
            'The user is trying to invite their own ID',
        ],
        22018: [
            'FRIENDS_ID_LIST_EMPTY',
            'The specified ID list is empty',
        ],
        22020: [
            'FRIENDS_OUTBOUND_INVITES_FULL',
            "The user's outbound invite list is full",
        ],
        22021: [
            'FRIENDS_INBOUND_INVITES_FULL',
            "The user's inbound invite list is full",
        ],
        22022: [
            'FRIENDS_FAVORITING_SELF',
            "You can't favorite yourself",
        ],
        22023: [
            'FRIENDS_UNFAVORITING_SELF',
            "You can't unfavorite yourself",
        ],
        22024: [
            'FRIENDS_FAVORITING_NON_FRIEND',
            "You can't favorite a user who is not a friend",
        ],
        22025: [
            'FRIENDS_UNFAVORITING_NON_FRIEND',
            "You can't unfavorite a user who is not a friend",
        ],
        22026: [
            'FRIENDS_NAMESPACE_MISTMATCH',
            "The namespaces don't match for the Persona IDs",
        ],
    },
};

const UserSessions = {
    Command: {
        1: 'validateSessionKey',
        3: 'fetchExtendedData',
        5: 'updateExtendedDataAttribute',
        8: 'updateHardwareFlags',
        9: 'getPermissions',
        10: 'getAccessGroup',
        12: 'lookupUser',
        13: 'lookupUsers',
        14: 'lookupUsersByPrefix',
        15: 'lookupUsersIdentification',
        20: 'updateNetworkInfo',
        21: 'listDefaultAccessGroup',
        22: 'listAuthorization',
        23: 'lookupUserGeoIPData',
        24: 'overrideUserGeoIPData',
        25: 'updateUserSessionClientData',
        26: 'setUserInfoAttribute',
        27: 'resetUserGeoIPData',
        28: 'lookupEntityByName',
        29: 'lookupEntityById',
        30: 'lookupEntitiesByIds',
        31: 'registerRemoteSlaveSession',
        32: 'lookupUserSessionId',
        33: 'fetchLastLocaleUsedAndAuthError',
        34: 'fetchUserFirstLastAuthTime',
        36: 'listAllPermissions',
        37: 'setUserGeoOptIn',
        38: 'remoteLoadUserExtendedData',
        39: 'remoteRefreshUserExtendedData',
        40: 'forceSessionLogout',
        41: 'enableUserAuditLogging',
        42: 'disableUserAuditLogging',
        43: 'requestUserExtendedDataProviderRegistration',
        44: 'getUserGeoIpData',
        45: 'getUniqueDeviceId',
        46: 'getIpFilterByName',
        47: 'lookupUsersByPrefixMultiNamespace',
        48: 'lookupUsersByPersonaNameMultiNamespace',
        49: 'lookupUsersByPersonaNamesMultiNamespace',
        50: 'lookupUsersByPersonaNames',
        53: 'checkConnectivity',
        54: 'forceOwnSessionLogout',
        55: 'updateLocalUserGroup',
        100: 'getUedInformationMap',
        56: 'fetchUsersAuditState',
        57: 'refreshQosPingSiteMap',
        58: 'getQosPingSites',
        60: 'setUserCrossPlatformOptIn',
        61: 'lookupUsersCrossPlatform',
        62: 'getDeviceLocality',
    },
    Message: {
        1: 'UserSessionExtendedDataUpdate',
        2: 'UserAdded',
        3: 'UserRemoved',
        5: 'UserUpdated',
        6: 'UserSubscriptionsUpdated',
        7: 'SessionSubscriptionsUpdated',
        8: 'UserAuthenticated',
        9: 'UserUnauthenticated',
        10: 'NotifyUserInfoUpdated',
        11: 'NotifyQosSettingsUpdated',
    },
    Error: {
        1: [
            'USER_ERR_USER_NOT_FOUND',
            'The referenced user was not found.',
        ],
        2: [
            'USER_ERR_SESSION_NOT_FOUND',
            'The referenced session was not found.',
        ],
        3: [
            'USER_ERR_DUPLICATE_SESSION',
            'The session could not be added because one from that user already exists.',
        ],
        4: [
            'USER_ERR_NO_EXTENDED_DATA',
            'The extended data could not be returned because there is no extended data for the given session',
        ],
        5: [
            'USER_ERR_MAX_DATA_REACHED',
            'The extended data attribute could not be added because the maximum number of attributes has been reached for this session',
        ],
        6: [
            'USER_ERR_KEY_NOT_FOUND',
            'The extended data attribute could not be removed because key was not found',
        ],
        7: [
            'USER_ERR_INVALID_SESSION_INSTANCE',
            'The session did not belong to the calling instance.',
        ],
        8: [
            'USER_ERR_INVALID_PARAM',
            'Invalid parameter(s).',
        ],
        9: [
            'USER_ERR_MINIMUM_CHARACTERS',
            'The minimum of characters is 3.',
        ],
        20: [
            'USER_ERR_EXISTS',
            'A duplicate user already exists',
        ],
        10: [
            'ACCESS_GROUP_ERR_INVALID_GROUP',
            'The specified access group was not found.',
        ],
        11: [
            'ACCESS_GROUP_ERR_DEFAULT_GROUP',
            'The specified access group is default group for the referenced user.',
        ],
        12: [
            'ACCESS_GROUP_ERR_NOT_CURRENT_GROUP',
            'The referenced user does not belong to the specified group.',
        ],
        13: [
            'ACCESS_GROUP_ERR_CURRENT_GROUP',
            'The referenced user already belong to the specified group.',
        ],
        14: [
            'ACCESS_GROUP_ERR_NO_GROUP_FOUND',
            'There is no group is found for specified external id and client type.',
        ],
        15: [
            'GEOIP_INCOMPLETE_PARAMETERS',
            'Parameters in GeoIp request are incomplete: city, state region and country must be supplied.',
        ],
        16: [
            'USER_ERR_GEOIP_LOOKUP_FAILED',
            'GeoIp lookup failed. Returned to the caller so they can take action, e.g., region selection.',
        ],
        23: [
            'GEOIP_ERR_USER_OPTOUT',
            'The requested user with opt-in field disabled.',
        ],
        17: [
            'ERR_ENTITY_TYPE_NOT_FOUND',
            'The entity type is not recognized by the component.',
        ],
        18: [
            'ERR_ENTITY_NOT_FOUND',
            'no entity is found matching the type name and name provided.',
        ],
        19: [
            'ERR_NOT_SUPPORTED',
            'the entity provided is recognized, but searching by name is not supported.',
        ],
        30: [
            'USER_ERR_CROSS_PLATFORM_OPTOUT',
            'Action not allowed for user opted-out of cross platform.',
        ],
        31: [
            'USER_ERR_DISALLOWED_PLATFORM',
            'The action requested required a disallowed cross platform interaction.',
        ],
    },
};

export const Components = {
    0: 'Core',
    1: 'Authentication',
    3: 'Example',
    4: 'GameManager',
    5: 'Redirector',
    7: 'Stats',
    9: 'Util',
    10: 'CensusData',
    11: 'Clubs',
    15: 'Messaging',
    25: 'AssociationLists',
    27: 'GpsContentController',
    28: 'GameReporting',
    30: 'Matchmaker',
    31: 'ByteVault',
    33: 'Achievements',
    334: 'Greeter',
    401: 'Search',
    402: 'GameManagerMetrics',
    500: 'GamePacker',
    1002: 'NucleusIdentity',
    1003: 'NucleusConnect',
    1006: 'XBLProfile',
    1010: 'Notify',
    1020: 'XBLSocial',
    1021: 'XBLPrivacyConfigs',
    1022: 'XBLReputationConfigs',
    1023: 'XBLReputationService',
    1024: 'XBLServiceConfigs',
    1025: 'XBLSystemConfigs',
    1026: 'XBLClientSessionDirectory',
    1028: 'ArsonXblSessionDirectoryArena',
    1029: 'ArsonXBLOrganizerTournamentsHub',
    1030: 'CCS',
    1031: 'Friends',
    1035: 'SecretVault',
    1037: 'PAS',
    1099: 'Recommendation',
    2001: 'TestService',
    3000: 'PSNBaseUrl',
    3001: 'PSNSessionInvitation',
    3002: 'PSNMatches',
    3003: 'PSNSessionManager',
    3004: 'PsnAuthZ',
    4000: 'GdprCompliance',
    30722: 'UserSessions',
};

export const Commands = {
    Core,
    Authentication,
    GameManager,
    Redirector,
    Stats,
    Util,
    Messaging,
    AssociationLists,
    GameReporting,
    Matchmaker,
    Achievements,
    Friends,
    UserSessions,
};

export const Methods = Object.fromEntries(
    Object.entries(Components).map(({ 0: cid, 1: component }) =>
    (Commands[component] ? [Object.entries(Commands[component].Command || {}), Object.entries(Commands[component].Message || {})].flat()
        .map(({ 0: id, 1: name }) => [`${component}.${name}`, [+cid, +id]]) : []),
    ).flat(),
);

export const Errors = Object.fromEntries(
    Object.entries(Components).map(({ 0: cid, 1: component }) =>
        (Commands[component] && Commands[component]['Error'] ? Object.entries(Commands[component]['Error']).map(({ 0: code, 1: error }) => [`${cid}.${code}`, { component, name: error[0], description: error[1], details: error[2] }]) : []),
    ).flat(),
);
