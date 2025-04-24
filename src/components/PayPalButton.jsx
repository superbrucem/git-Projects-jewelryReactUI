import React, { useEffect, useRef, useState } from 'react';
import { Box, Typography, CircularProgress, Button } from '@mui/material';

const PayPalButton = ({ amount, currency = 'CAD', onSuccess, onError }) => {
  const paypalRef = useRef();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  // Use a sandbox client ID for testing
  const PAYPAL_CLIENT_ID = 'sb';

  useEffect(() => {
    // Check if the script is already loaded
    if (document.querySelector('script[src*="paypal.com/sdk/js"]')) {
      setScriptLoaded(true);
      setLoading(false);
      return;
    }

    // Load the PayPal script with additional parameters
    const script = document.createElement('script');
    script.src = `https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}&currency=${currency}&locale=en_CA&buyer-country=CA&components=buttons,funding-eligibility`;
    script.async = true;

    script.onload = () => {
      setScriptLoaded(true);
      setLoading(false);
    };

    script.onerror = () => {
      setLoading(false);
      setError('Failed to load PayPal SDK. Please try again later.');
    };

    document.body.appendChild(script);

    return () => {
      // Only remove the script if we added it
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [currency]);

  useEffect(() => {
    if (!scriptLoaded || loading || error || !paypalRef.current) return;

    // Clear any existing buttons
    paypalRef.current.innerHTML = '';

    // Initialize PayPal button
    window.paypal
      .Buttons({
        style: {
          layout: 'vertical',
          color: 'gold',
          shape: 'rect',
          label: 'pay'
        },
        funding: {
          allowed: [window.paypal.FUNDING.CARD],
          disallowed: []
        },
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                description: 'Ottawa Opal Shop Purchase',
                amount: {
                  currency_code: currency,
                  value: amount.toFixed(2),
                },
              },
            ],
            application_context: {
              shipping_preference: 'NO_SHIPPING',
              user_action: 'PAY_NOW',
              locale: 'en-CA',
              brand_name: 'Ottawa Opal Shop',
              country_code: 'CA',
              payment_method: {
                payee_preferred: 'IMMEDIATE_PAYMENT_REQUIRED'
              },
              landing_page: 'BILLING'
            }
          });
        },
        onApprove: async (data, actions) => {
          try {
            const order = await actions.order.capture();
            console.log('Payment successful', order);
            onSuccess(order);
          } catch (err) {
            console.error('Payment capture error', err);
            onError(err);
          }
        },
        onError: (err) => {
          console.error('PayPal error', err);
          setError(err.message || 'An error occurred with PayPal');
          onError(err);
        },
        onCancel: () => {
          console.log('Payment cancelled');
        }
      })
      .render(paypalRef.current)
      .catch(err => {
        console.error('Error rendering PayPal buttons', err);
        setError('Could not initialize PayPal checkout');
        onError(err);
      });
  }, [scriptLoaded, loading, error, amount, currency, onSuccess, onError]);

  // Simulate PayPal for development
  const handleSimulatePayment = () => {
    onSuccess({
      id: 'SIMULATED-ORDER-ID-' + Date.now(),
      status: 'COMPLETED',
      purchase_units: [{
        amount: {
          value: amount,
          currency_code: currency
        }
      }],
      payer: {
        email_address: 'customer@example.com',
        name: {
          given_name: 'John',
          surname: 'Doe'
        }
      },
      create_time: new Date().toISOString(),
      update_time: new Date().toISOString()
    });
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', my: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ my: 3, textAlign: 'center' }}>
        <Typography variant="body1" color="error" gutterBottom>
          Could not initialize PayPal checkout
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom sx={{ mb: 2 }}>
          Please use the Credit/Debit Card payment option above.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ my: 3 }}>
      <Box ref={paypalRef} sx={{ mb: 2 }} />

      {/* Hidden in production - only for development */}
      <Box sx={{ display: 'none' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSimulatePayment}
          fullWidth
          sx={{ mt: 1 }}
        >
          Simulate Successful Payment
        </Button>
      </Box>
    </Box>
  );
};

export default PayPalButton;
