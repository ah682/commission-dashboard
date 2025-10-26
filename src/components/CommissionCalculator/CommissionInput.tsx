import { useCallback } from 'react';
import { isValidPositiveNumber } from '../../utils/formatters';
import { CURRENCY_SYMBOL } from '../../constants/commissionScheme';

interface CommissionInputProps {
  value: string;
  onChange: (value: string) => void;
  isCalculating: boolean;
  error: string | null;
}

/**
 * Commission Input Component
 * 
 * Provides a validated input field for revenue entry with real-time feedback
 */
const CommissionInput = ({
  value,
  onChange,
  isCalculating,
  error,
}: CommissionInputProps) => {
  /**
   * Handles input change with validation
   */
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;

      // Allow empty string for clearing
      if (newValue === '') {
        onChange('');
        return;
      }

      // Only allow valid positive numbers
      if (isValidPositiveNumber(newValue)) {
        onChange(newValue);
      }
    },
    [onChange]
  );

  /**
   * Handles input blur to format the value
   */
  const handleBlur = useCallback(() => {
    if (value === '') return;

    // Format to 2 decimal places on blur
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      onChange(numValue.toFixed(2));
    }
  }, [value, onChange]);

  return (
    <div className="form-control w-full mb-6">
      <label className="label">
        <span className="label-text font-medium text-neutral text-sm">
          Revenue Amount
        </span>
      </label>

      <div className="relative">
        {/* Currency Symbol */}
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold text-lg">
          {CURRENCY_SYMBOL}
        </span>

        {/* Input Field */}
        <input
          type="text"
          inputMode="decimal"
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="0.00"
          className={`input input-bordered w-full pl-10 pr-12 text-lg font-medium h-12 ${
            error ? 'input-error' : 'focus:input-primary'
          }`}
          aria-label="Revenue amount"
          aria-describedby={error ? 'input-error' : undefined}
        />

        {/* Loading Indicator */}
        {isCalculating && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2">
            <span className="loading loading-spinner loading-sm text-primary"></span>
          </span>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <label className="label">
          <span id="input-error" className="label-text-alt text-error font-medium">
            {error}
          </span>
        </label>
      )}

      {/* Helper Text */}
      {!error && (
        <label className="label">
          <span className="label-text-alt text-gray-500">
            Enter the total revenue amount to see your commission
          </span>
        </label>
      )}
    </div>
  );
};

export default CommissionInput;