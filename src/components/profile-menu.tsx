import { useWalletLogin } from '@lens-protocol/react';
import { useActiveProfile, useActiveWallet, useWalletLogout } from '@lens-protocol/react-web';
import { Button } from '@mui/material';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';

function LogoutButton() {
    const { execute: logout, isPending } = useWalletLogout();

    return (
        <Button disabled={isPending} onClick={logout}>Log out</Button>
    );
}

function LoginButton({ wallet }) {
    const { execute: login, error: loginError, isPending: isLoginPending } = useWalletLogin();


    const result = useAccount();
    console.log('results', result, wallet)
    const { isConnected } = result;
    const { disconnectAsync } = useDisconnect();

    const { connectAsync } = useConnect({
        connector: new InjectedConnector(),
    });

    const onLoginClick = async () => {
        if (isConnected) {
            await disconnectAsync();
        }

        const { connector } = await connectAsync();

        if (connector instanceof InjectedConnector) {
            const signer = await connector.getSigner();
            await login(signer);
        }
    };

    if (wallet?.address) {
        return <>{wallet.address}</>
    }
    return (
        <>
            {loginError && <p>Error</p>}
            <Button variant="contained" disabled={isLoginPending} onClick={onLoginClick}>Log in</Button>
        </>
    );
}


export const ProfileMenu = () => {
    const { data: wallet } = useActiveWallet();
    const { data: profile } = useActiveProfile();
    console.log('wallet', wallet, 'profile', profile?.handle);
    return (
        <div style={{ backgroundColor: '#00501e', color: 'white' }}>
            <LoginButton wallet={wallet} />
            {/* <LogoutButton /> */}

        </div>
    )
}