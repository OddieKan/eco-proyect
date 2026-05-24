const Tabs =({tab, setTab}) => {
    const tabs = ["Punto Limpio", "Reciclaje","Recogida"];

    return(
        <div style={{
            display:'flex',
            justifyContent: 'center',
            gap:'10px',
            marginBottom: '20px'
        }}>
            {tabs.map(t => (
                <button
                key={t}
                onClick={()=> setTab(t)}
                style={{
                    padding: '10px 15px',
                    borderRadius: '20px',
                    border: 'none',
                    backgroundColor: tab === t? '#2ecc71' : '#eee',
                    color: tab === t? 'white': '#333',
                    cursor: 'pointer'
                }}
                >
                    {t}
                    </button>

            ))}
            </div>          
    );
};